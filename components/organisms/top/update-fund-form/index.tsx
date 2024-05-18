import { PrimaryButton } from "@components/molecules/primary-button";
import useUpdateFundPrice from "@hooks/useUpdateFundPrice";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";
import React, { useState } from "react";

export type Props = {
  japanFundPrice: FundPriceModel;
  setFundPrices: React.Dispatch<React.SetStateAction<FundPriceModel[]>>;
};

const UpdateFundForm: React.FC<Props> = ({ japanFundPrice, setFundPrices }) => {
  const [fundPrice, setFundPrice] = useState(japanFundPrice.price);
  const { isUpdating, updateFundPrice, error } = useUpdateFundPrice();

  const handleUpdateFundPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating fund price...");
    const updatedFund = await updateFundPrice(
      japanFundPrice.id,
      Number(fundPrice)
    );
    console.log("Update result:", updatedFund);
    if (updatedFund) {
      setFundPrices((prevFundPrices) =>
        prevFundPrices.map((fp) =>
          fp.id === japanFundPrice.id ? updatedFund : fp
        )
      );
      alert("更新しました！");
    } else {
      console.error("Failed to update fund price.");
    }
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

export default UpdateFundForm;
