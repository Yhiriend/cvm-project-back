import * as CartRepository from "../repository/cart.repository";

class CartFacade {
  async insertProductIntoCart(cartId: number, productId: number) {
    try {
      return await CartRepository.insertProductIntoCart(cartId, productId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during insertProductIntoCart process");
    }
  }

  async getCartElementsByUserId(userId: number) {
    try {
      return await CartRepository.getCartElementsByUserId(userId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during getCartElementsByUserId process");
    }
  }

  async getCartByUserId(userId: number) {
    try {
      return await CartRepository.getCartByUserId(userId);
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
      return await CartRepository.buyCart(
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
      return await CartRepository.removeProductFromCart(cartId, productId);
    } catch (error) {
      console.error(error);
      throw new Error("Error during removeProductFromCart process");
    }
  }
}

export default new CartFacade();
