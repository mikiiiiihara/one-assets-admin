import { useState, useEffect } from "react";
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

  return { stockPrices, isLoading, error, setStockPrices };
};

export default useStockPrices;
