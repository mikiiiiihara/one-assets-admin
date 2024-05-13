import { PrimaryButton } from "@components/molecules/primary-button";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";
import React, { useState } from "react";

export type Props = {
  japanStockPrice: StockPriceModel;
  updateStockPrice: (
    id: string,
    price: number,
    dividend: number
  ) => Promise<void>;
};

const UpdateStockForm: React.FC<Props> = ({
  japanStockPrice,
  updateStockPrice,
}) => {
  const [stockPrice, setStockPrice] = useState(japanStockPrice.price);
  const [dividend, setDividend] = useState(japanStockPrice.dividend);
  // ファンド価格更新処理
  const handleUpdateFundPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStockPrice(
      japanStockPrice.id,
      Number(stockPrice),
      Number(dividend)
    );
    alert("更新しました！");
  };
  return (
    <form
      onSubmit={handleUpdateFundPrice}
      className="w-[90%] m-auto mb-4 border p-4 rounded drop-shadow border-neutral-600"
    >
      <p>株式名：{japanStockPrice.name}</p>
      <div className="flex justify-center items-center">
        <div className="block">
          価格：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2"
            type="number"
            value={stockPrice}
            onChange={(e) => setStockPrice(Number(e.target.value))}
            placeholder="価格を入力してください"
          />
          配当：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2"
            type="number"
            value={dividend}
            onChange={(e) => setDividend(Number(e.target.value))}
            placeholder="配当を入力してください"
          />
        </div>
        <PrimaryButton className="ml-4" content="更新" type="submit" />
      </div>
    </form>
  );
};

export default UpdateStockForm;
