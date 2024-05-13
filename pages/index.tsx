import { Loading } from "@components/atoms/loading";
import Top from "@components/organisms/top";
import useFundPrices from "@hooks/useFundPrices";
import useStockPrices from "@hooks/useStockPrices";

export default function Home() {
  const {
    fundPrices,
    isLoading: isFundLoading,
    error: fundError,
    updateFundPrice,
  } = useFundPrices();
  const {
    stockPrices,
    isLoading: isStockLoading,
    error: stockError,
    updateStockPrice,
  } = useStockPrices();
  if (isFundLoading || isStockLoading) return <Loading />;
  if (fundError) return <div>Error: {fundError}</div>;
  if (stockError) return <div>Error: {stockError}</div>;
  return (
    <Top
      japanFundPrices={fundPrices}
      japanStockPrices={stockPrices}
      updateFundPrice={updateFundPrice}
      updateStockPrice={updateStockPrice}
    />
  );
}
