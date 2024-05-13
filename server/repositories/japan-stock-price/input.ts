export type CreateStockPriceInput = {
  name: string;
  code: string;
  price: number;
  dividend: number;
};

export type UpdateStockPriceInput = {
  id: string;
  price: number;
  dividend: number;
};
