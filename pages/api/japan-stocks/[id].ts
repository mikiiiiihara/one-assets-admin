// pages/api/japan-funds/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@server/lib/prisma-client";
import { ErrorResponse } from "@server/utils/error";
import { UpdateStockPriceInput } from "@server/repositories/japan-stock-price/input";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StockPriceModel | ErrorResponse>
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query;
  // リクエストボディの型を確認
  if (
    typeof req.body.price !== "number" ||
    typeof req.body.dividend !== "number"
  ) {
    res.status(400).json({
      message: "Invalid type for price or dividend, expected a number",
    });
    return;
  }

  const input: UpdateStockPriceInput = {
    id: id as string,
    price: req.body.price,
    dividend: req.body.dividend,
  };

  try {
    const fund = await prismaClient.japanStockPrice.update({
      where: {
        id: input.id,
      },
      data: {
        price: input.price,
        dividend: input.dividend,
      },
    });

    res.status(200).json(fund);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error updating stock" });
  }
}
