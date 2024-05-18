import { useState, useCallback } from "react";
import useFetchAPI from "./useFetchApi";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";

const useUpdateFundPrice = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  const updateFundPrice = useCallback(
    async (id: string, price: number) => {
      setIsUpdating(true);
      try {
        const updatedFund = await fetchApi<FundPriceModel>(
          `/api/japan-funds/${id}`,
          setError,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price }),
          }
        );
        if (updatedFund === null) {
          throw new Error("Failed to update fund price");
        }
        setIsUpdating(false);
        return updatedFund;
      } catch (e) {
        setError((e as Error).message);
        setIsUpdating(false);
        return null;
      }
    },
    [fetchApi]
  );

  return { isUpdating, updateFundPrice, error };
};

export default useUpdateFundPrice;
