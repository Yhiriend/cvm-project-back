import CartRepository from "../repository/cart.repository";

export default class CartFacade {
  constructor(private cartRepository: CartRepository) {}

  async insertProductIntoCart(cartId: number, productId: number) {
    try {
      return await this.cartRepository.insertProductIntoCart(cartId, productId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during insertProductIntoCart process");
    }
  }

  async getCartElementsByUserId(userId: number) {
    try {
      return await this.cartRepository.getCartElementsByUserId(userId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during getCartElementsByUserId process");
    }
  }

  async getCartByUserId(userId: number) {
    try {
      return await this.cartRepository.getCartByUserId(userId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during getCartByUserId process");
    }
  }

  async buyCart(
    cartId: number,
    totalToPay: number,
    paymentMethod: number,
    paymentType: string,
    userId: number,
    address?: string,
    phone?: string
  ) {
    try {
      return await this.cartRepository.buyCart(
        cartId,
        totalToPay,
        paymentMethod,
        paymentType,
        userId,
        address,
        phone
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error during buyCart process");
    }
  }

  async removeProductFromCart(cartId: number, productId: number) {
    try {
      return await this.cartRepository.removeProductFromCart(cartId, productId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during removeProductFromCart process");
    }
  }
}
