import { useState, useEffect, useCallback } from "react";
import useFetchAPI from "./useFetchApi";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";

const useStockPrices = () => {
  const [stockPrices, setStockPrices] = useState<StockPriceModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getStockPrices = async () => {
      setIsLoading(true);
      const stockPrices = await fetchApi<StockPriceModel[]>(
        "/api/japan-stocks",
        setError
      );
      if (stockPrices === null) throw new Error("Failed to fetch japan-stocks");
      setStockPrices(stockPrices);
      setIsLoading(false);
    };

    getStockPrices();
  }, []);

  const updateStockPrice = useCallback(
    async (id: string, price: number, dividend: number) => {
      setIsLoading(true);
      try {
        const updatedStock = await fetchApi<StockPriceModel>(
          `/api/japan-stocks/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price, dividend }),
          }
        );
        if (updatedStock !== null) {
          setStockPrices(
            stockPrices.map((f) => (f.id === id ? { ...f, price } : f))
          );
        } else {
          throw new Error("Failed to update stock price");
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchApi, stockPrices]
  );

  return { stockPrices, isLoading, updateStockPrice, error };
};

export default useStockPrices;
