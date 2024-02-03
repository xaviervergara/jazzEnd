import { cartModel } from '../models/carts.models.js';

class CartManager {
  constructor() {}

  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log(`Error al traer carritos: ${error}`);
      return [];
    }
  }

  async getCartById(id) {
    try {
      const cartId = await cartModel.findOne({ _id: id });
      return cartId;
    } catch (error) {
      console.log(`Error al traer carrito: ${error}`);
      return [];
    }
  }

  async addCart() {
    try {
      //No nos manejamos con un array de carritos dentro de la clase, sino
      //directamente con el contenido del archivo json que escribimos
      const carts = await cartModel.find();
      carts.push({
        // id: carts.length + 1,
        products: [],
      });
      await cartModel.create(carts); //?
    } catch (error) {
      console.log(`Error al agregar carrito: ${error}`);
      return false;
    }
  }

  async addProductToCart(pid, cid) {
    try {
      //traemos los carritos cuya composicion es  {"id": x, "products": [{product: id, quantity:x}]}
      const carts = await cartModel.find();
      //El metodo map se utiliza para transformar cada elemento de un array según una función
      //proporcionada y devuelve un nuevo array que contiene los resultados de aplicar la función
      //a cada elemento.
      const updatedCarts = carts.map((cart) => {
        //si se encuentra el carrito segun el parametro proporcionado
        if (cart._id === cid) {
          //buscamos si existe el producto pasado por parametro DENTRO DEL CARRITO
          const productoExistente = cart.products.find(
            (p) => p.product === pid
          );
          //si ya existe el producto simplemente se suma la cantidad, asi no se repite
          if (productoExistente) {
            productoExistente.quantity++;
          }
          //Si no existe, vamos a dejar lo que ya existia, osea los productos existentes dentro del carrito,
          //y agregamos el producto nuevo, (solo nos pide que agreguemos id y cantidad)
          else {
            cart.products = [...cart.products, { product: pid, quantity: 1 }];
          }
        }
        //si no se encuentra el carrito pasado por parametro, simplemente mapea el mismo carrito
        return cart;
      });
      //reescribimos el archivos
      await cartModel.create(updatedCarts);
    } catch (error) {
      console.log(`Error al actualizar carrito: ${error}`);
      return false;
    }
  }

  // async deleteAll() {
  //   await fs.promises.writeFile(this.path, JSON.stringify([]), 'utf-8');
  // }
}

export default CartManager;
