export interface Cart {
  id: number;
  user_id: number;
  total: number;
  productListId?: number[];
  paid: boolean;
}
