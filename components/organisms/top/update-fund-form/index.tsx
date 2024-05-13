import { PrimaryButton } from "@components/molecules/primary-button";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";
import React, { useState } from "react";

export type Props = {
  japanFundPrice: FundPriceModel;
  updateFundPrice: (id: string, price: number) => Promise<void>;
};

const UpdateFundForm: React.FC<Props> = ({
  japanFundPrice,
  updateFundPrice,
}) => {
  const [fundPrice, setFundPrice] = useState(japanFundPrice.price);
  // ファンド価格更新処理
  const handleUpdateFundPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFundPrice(japanFundPrice.id, Number(fundPrice));
    alert("更新しました！");
  };
  return (
    <form
      onSubmit={handleUpdateFundPrice}
      className="w-[90%] m-auto mb-4 border p-4 rounded drop-shadow border-neutral-600"
    >
      <p>ファンド名：{japanFundPrice.name}</p>
      <div className="flex justify-center items-center">
        価格：
        <input
          className="bg-[#343a40] border-neutral-600 border rounded m-2"
          type="number"
          value={fundPrice}
          onChange={(e) => setFundPrice(Number(e.target.value))}
          placeholder="価格を入力してください"
        />
        <PrimaryButton className="ml-4" content="更新" type="submit" />
      </div>
    </form>
  );
};

export default UpdateFundForm;
