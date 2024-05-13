// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@server/utils/error";
import { List } from "@server/repositories/japan-stock-price/stock-price.repository";
import { StockPriceModel } from "@server/repositories/japan-stock-price/stock-price.model";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<StockPriceModel[] | ErrorResponse>
) {
  const stocks = await List();
  return res.json(stocks);
}
