export type CreateFundPriceInput = {
  name: string;
  code: string;
  price: number;
};

export type UpdateFundPriceInput = {
  id: string;
  price: number;
};
