import prismaClient from "@server/lib/prisma-client";
import { CreateStockPriceInput } from "./input";
import { StockPriceModel } from "./stock-price.model";

export const List = async (): Promise<StockPriceModel[]> => {
  const response = await prismaClient.japanStockPrice.findMany({
    orderBy: {
      name: "asc", // 名前順で取得
    },
    select: {
      id: true,
      name: true,
      code: true,
      price: true,
      dividend: true,
    },
  });

  if (response.length === 0) return [];

  return response;
};
export const Create = async (
  data: CreateStockPriceInput
): Promise<StockPriceModel> => {
  const response = await prismaClient.japanStockPrice.create({
    data: {
      name: data.name,
      code: data.code,
      price: data.price,
      dividend: data.dividend,
    },
    select: {
      id: true,
      name: true,
      code: true,
      price: true,
      dividend: true,
    },
  });

  return response;
};
