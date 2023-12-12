export interface Product {
    id: number,
    brand: string,
    price: number,
    reference: string,
    voltage: number,
    tech: string,
    type: string | null,
    image: string | null,
    state: number,
    description: string | null,
    registerDate: string
}