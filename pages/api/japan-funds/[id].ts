// pages/api/japan-funds/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@server/lib/prisma-client";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";
import { ErrorResponse } from "@server/utils/error";
import { UpdateFundPriceInput } from "@server/repositories/japan-fund-price/input";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FundPriceModel | ErrorResponse>
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query;
  // リクエストボディの型を確認
  if (typeof req.body.price !== "number") {
    res
      .status(400)
      .json({ message: "Invalid type for price, expected a number" });
    return;
  }

  const input: UpdateFundPriceInput = {
    id: id as string,
    price: req.body.price,
  };

  try {
    const fund = await prismaClient.japanFundPrice.update({
      where: {
        id: input.id,
      },
      data: {
        price: input.price,
      },
    });

    res.status(200).json(fund);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error updating fund" });
  }
}
