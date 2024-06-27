import { Center } from "@components/atoms/center";
import { TextTitle1 } from "@components/atoms/text/textTitle1";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";
import React from "react";
import UpdateFundForm from "./update-fund-form";

export type Props = {
  japanFundPrices: FundPriceModel[];
  setFundPrices: React.Dispatch<React.SetStateAction<FundPriceModel[]>>;
};

const Top: React.FC<Props> = ({ japanFundPrices, setFundPrices }) => {
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
    </Center>
  );
};

export default Top;
