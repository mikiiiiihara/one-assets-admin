// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FundPriceModel } from "@server/repositories/japan-fund-price/fund-price.model";
import { ErrorResponse } from "@server/utils/error";
import { List } from "@server/repositories/japan-fund-price/fund-price.repository";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FundPriceModel[] | ErrorResponse>
) {
  const funds = await List();
  return res.json(funds);
}
