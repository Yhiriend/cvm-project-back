import * as ProductRepository from "../repository/product.repository";

class ProductFacade {
  async getNewestProducts() {
    try {
      return await ProductRepository.getNewest();
    } catch (error) {
      console.error(error);
      throw new Error("Error during getNewestProducts process");
    }
  }

  async searchProducts(keywords: string) {
    try {
      return await ProductRepository.searchProducts(keywords);
    } catch (error) {
      console.error(error);
      throw new Error("Error during searchProducts process");
    }
  }
}

export default new ProductFacade();
