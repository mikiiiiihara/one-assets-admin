import prismaClient from "@server/lib/prisma-client";
import { CreateFundPriceInput } from "./input";
import { FundPriceModel } from "./fund-price.model";

export const List = async (): Promise<FundPriceModel[]> => {
  const response = await prismaClient.japanFundPrice.findMany({
    orderBy: {
      name: "asc", // 名前順で取得
    },
    select: {
      id: true,
      name: true,
      code: true,
      price: true,
    },
  });

  if (response.length === 0) return [];

  return response;
};
export const Create = async (
  data: CreateFundPriceInput
): Promise<FundPriceModel> => {
  const response = await prismaClient.japanFundPrice.create({
    data: {
      name: data.name,
      code: data.code,
      price: data.price,
    },
    select: {
      id: true,
      name: true,
      code: true,
      price: true,
    },
  });

  return response;
};
