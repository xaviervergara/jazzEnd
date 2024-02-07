import { cartModel } from '../models/carts.models.js';

class CartManager {
  constructor() {}

  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log(`Error al traer carritos: ${error}`);
    }
  }

  async getCartById(id) {
    try {
      const cartId = await cartModel.findOne({ _id: id });
      return cartId;
    } catch (error) {
      console.log(`Error al traer carrito: ${error}`);
    }
  }

  async addCart() {
    try {
      //No nos manejamos con un array de carritos dentro de la clase, sino
      //directamente con el contenido del archivo json que escribimos
      const cart = await cartModel.create({ products: [] });
      return cart;
    } catch (error) {
      console.log(`Error al agregar carrito: ${error}`);
      // return false;
    }
  }

  async addProductToCart(pid, cid) {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cid, 'products.product': pid },
        { $inc: { 'products.$.quantity': 1 } },
        { new: true }
      );

      if (!updatedCart) {
        // Si el producto no existe en el carrito, lo agregamos
        await cartModel.updateOne(
          { _id: cid },
          { $push: { products: { product: pid, quantity: 1 } } }
        );
      }

      return true;
    } catch (error) {
      console.error(`Error al actualizar carrito: ${error}`);
      return false;
    }
  }
}

export default CartManager;
