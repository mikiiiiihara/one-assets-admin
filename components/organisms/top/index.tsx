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
  updateFundPrice: (id: string, price: number) => Promise<void>;
  updateStockPrice: (
    id: string,
    price: number,
    dividend: number
  ) => Promise<void>;
};

const Top: React.FC<Props> = ({
  japanFundPrices,
  japanStockPrices,
  updateFundPrice,
  updateStockPrice,
}) => {
  return (
    <Center>
      <section className="m-4">
        <TextTitle1>日本投資信託</TextTitle1>
        {japanFundPrices.map((fundPrice) => (
          <UpdateFundForm
            key={fundPrice.id}
            japanFundPrice={fundPrice}
            updateFundPrice={updateFundPrice}
          />
        ))}
      </section>
      <section className="m-4">
        <TextTitle1>日本株式</TextTitle1>
        {japanStockPrices.map((stockPrice) => (
          <UpdateStockForm
            key={stockPrice.id}
            japanStockPrice={stockPrice}
            updateStockPrice={updateStockPrice}
          />
        ))}
      </section>
    </Center>
  );
};

export default Top;
