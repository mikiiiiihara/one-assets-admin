import { Center } from "@components/atoms/center";
import React from "react";

export type Props = {
  japanFundPrices: string;
  japanStockPrices: string;
};

const Top: React.FC<Props> = ({ japanFundPrices, japanStockPrices }) => {
  return (
    <Center>
      <p className="font-bold">Hello!!</p>
    </Center>
  );
};

export default Top;
