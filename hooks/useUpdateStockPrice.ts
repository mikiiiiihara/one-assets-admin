import { useState, useCallback } from "react";
import useFetchAPI from "./useFetchApi";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";

const useUpdateStockPrice = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateStockPrice = useCallback(
    async (id: string, price: number, dividend: number) => {
      setIsUpdating(true);
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
        if (updatedStock === null) {
          throw new Error("Failed to update stock price");
        }
        setIsUpdating(false);
        return updatedStock;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateStockPrice, error };
};

export default useUpdateStockPrice;
