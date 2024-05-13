import prismaClient from "@server/lib/prisma-client";
import { CreateFundInput } from "./input";
import { FundModel } from "./fund-price.model";

export const List = async (): Promise<FundModel[]> => {
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
export const Create = async (data: CreateFundInput): Promise<FundModel> => {
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
