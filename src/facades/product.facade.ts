import ProductRepository from "../repository/product.repository";

export default class ProductFacade {
  constructor(private productRepository: ProductRepository) {}

  async getNewestProducts() {
    try {
      return await this.productRepository.getNewest();
    } catch (error) {
      console.error(error);
      throw new Error("Error during getNewestProducts process");
    }
  }

  async searchProducts(keywords: string) {
    try {
      return await this.productRepository.searchProducts(keywords);
    } catch (error) {
      console.error(error);
      throw new Error("Error during searchProducts process");
    }
  }
}
