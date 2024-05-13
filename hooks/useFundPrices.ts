import { useState, useEffect, useCallback } from "react";
import useFetchAPI from "./useFetchApi";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";

const useFundPrices = () => {
  const [fundPrices, setFundPrices] = useState<FundPriceModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchApi = useFetchAPI();

  useEffect(() => {
    const getFundPrices = async () => {
      setIsLoading(true);
      const fundPrices = await fetchApi<FundPriceModel[]>(
        "/api/japan-funds",
        setError
      );
      if (fundPrices === null) throw new Error("Failed to fetch japan-funds");
      setFundPrices(fundPrices);
      setIsLoading(false);
    };

    getFundPrices();
  }, []);

  const updateFundPrice = useCallback(
    async (id: string, price: number) => {
      setIsLoading(true);
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
        if (updatedFund !== null) {
          setFundPrices(
            fundPrices.map((f) => (f.id === id ? { ...f, price } : f))
          );
        } else {
          throw new Error("Failed to update fund price");
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchApi, fundPrices]
  );

  return { fundPrices, isLoading, updateFundPrice, error };
};

export default useFundPrices;
