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

  return { fundPrices, isLoading, error, setFundPrices };
};

export default useFundPrices;
