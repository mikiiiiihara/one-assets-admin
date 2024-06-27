import { Loading } from "@components/atoms/loading";
import Top from "@components/organisms/top";
import useFundPrices from "@hooks/useFundPrices";

export default function Home() {
  const { fundPrices, isLoading, error, setFundPrices } = useFundPrices();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return <Top japanFundPrices={fundPrices} setFundPrices={setFundPrices} />;
}
