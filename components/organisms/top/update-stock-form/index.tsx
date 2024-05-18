import { PrimaryButton } from "@components/molecules/primary-button";
import useUpdateStockPrice from "@hooks/useUpdateStockPrice";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";
import React, { useState } from "react";

export type Props = {
  japanStockPrice: StockPriceModel;
  setStockPrices: React.Dispatch<React.SetStateAction<StockPriceModel[]>>;
};

const UpdateStockForm: React.FC<Props> = ({
  japanStockPrice,
  setStockPrices,
}) => {
  const [stockPrice, setStockPrice] = useState(japanStockPrice.price);
  const [dividend, setDividend] = useState(japanStockPrice.dividend);
  const { isUpdating, updateStockPrice, error } = useUpdateStockPrice();

  const handleUpdateStockPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStock = await updateStockPrice(
      japanStockPrice.id,
      Number(stockPrice),
      Number(dividend)
    );
    console.log("Update result:", updatedStock);
    if (updatedStock) {
      setStockPrices((prevStockPrices) =>
        prevStockPrices.map((sp) =>
          sp.id === japanStockPrice.id ? updatedStock : sp
        )
      );
      alert("更新しました！");
    }
  };

  return (
    <form
      onSubmit={handleUpdateStockPrice}
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
        <PrimaryButton
          className="ml-4"
          content={!isUpdating ? "更新" : "更新中..."}
          type="submit"
        />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default UpdateStockForm;
