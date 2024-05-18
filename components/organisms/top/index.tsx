import { Center } from "@components/atoms/center";
import { TextTitle1 } from "@components/atoms/text/textTitle1";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";
import React from "react";
import UpdateFundForm from "./update-fund-form";
import UpdateStockForm from "./update-stock-form";

export type Props = {
  japanFundPrices: FundPriceModel[];
  japanStockPrices: StockPriceModel[];
  setFundPrices: React.Dispatch<React.SetStateAction<FundPriceModel[]>>;
  setStockPrices: React.Dispatch<React.SetStateAction<StockPriceModel[]>>;
};

const Top: React.FC<Props> = ({
  japanFundPrices,
  japanStockPrices,
  setFundPrices,
  setStockPrices,
}) => {
  return (
    <Center>
      <section className="m-4">
        <TextTitle1>日本投資信託</TextTitle1>
        {japanFundPrices.map((fundPrice) => (
          <UpdateFundForm
            key={fundPrice.id}
            japanFundPrice={fundPrice}
            setFundPrices={setFundPrices}
          />
        ))}
      </section>
      <section className="m-4">
        <TextTitle1>日本株式</TextTitle1>
        {japanStockPrices.map((stockPrice) => (
          <UpdateStockForm
            key={stockPrice.id}
            japanStockPrice={stockPrice}
            setStockPrices={setStockPrices}
          />
        ))}
      </section>
    </Center>
  );
};

export default Top;
