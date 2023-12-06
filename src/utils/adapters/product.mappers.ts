import { AirConditioner } from "../../models/airconditioner.type";

export interface DbProduct {
  id?: number;
  brand: string;
  tech: string;
  price: number;
  reference: string;
  voltage: string;
  type: string | null;
  state: string;
  register_date: string;
  description: string | null;
  image: string | null;
}

export const mapProductToDb = async (
  product: AirConditioner
): Promise<DbProduct> => {
  return {
    brand: product.brand,
    tech: product.tech,
    price: product.price,
    reference: product.reference,
    voltage: product.voltage.toString() || '110',
    type: product.type,
    state: product.state.toString(),
    register_date: product.registerDate,
    description: product.description || null,
    image: product.image || null,
  };
};

export const mapDbProductToProduct = (dbProduct: DbProduct): AirConditioner => {
  return {
    id: dbProduct.id!,
    brand: dbProduct.brand,
    tech: dbProduct.tech,
    price: dbProduct.price,
    reference: dbProduct.reference,
    voltage: Number(dbProduct.voltage),
    type: dbProduct.type,
    state: Number(dbProduct.state),
    registerDate: dbProduct.register_date,
    description: dbProduct.description,
    image: dbProduct.image,
  };
};
