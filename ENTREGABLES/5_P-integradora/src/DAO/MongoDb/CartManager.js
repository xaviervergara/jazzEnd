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
        //filter
        { _id: cid },
        //update
        {
          $inc: { 'products.$[elem].quantity': 1 },
          $setOnInsert: { _id: cid },
        },
        //options
        {
          arrayFilters: [{ 'elem.product': pid }],
          upsert: true,
          new: true,
        }
      );

      if (!updatedCart) {
        console.error('Constructor error: Could add update cart');
      }
    } catch (error) {
      console.log(`Error al actualizar carrito: ${error}`);
    }
  }
  // NUEVA
  // async addProductToCart(pid, cid) {
  //   try {
  //     const filter = { _id: cid };
  //     const update = {
  //       $inc: { 'products.$[elem].quantity': 1 },
  //       $setOnInsert: { _id: cid }, // Esto garantiza que se cree un nuevo documento si no existe
  //     };
  //     const options = {
  //       arrayFilters: [{ 'elem.product': pid }],
  //       upsert: true, // Esto crea un nuevo documento si no existe uno con el _id proporcionado
  //       new: true, // Esto devuelve el documento actualizado
  //     };

  //     const updatedCart = await cartModel.findOneAndUpdate(
  //       filter,
  //       update,
  //       options
  //     );
  //     // console.log(`esto es updatedCart: ${updatedCart}`);
  //     if (!updatedCart) {
  //       console.error(`Error: No se pudo actualizar el carrito`);
  //       return false;
  //     }

  //     console.log('Carrito actualizado:', updatedCart);
  //     return true;
  //   } catch (error) {
  //     console.error(`Error al actualizar el carrito: ${error}`);
  //     return false;
  //   }
  // }

  //MIA VIEJA
  // async addProductToCart(pid, cid) {
  //   try {
  //     //traemos los carritos cuya composicion es  {"id": x, "products": [{product: id, quantity:x}]}

  //     //Primero encontramos el carrito que ingresa el cliente
  //     const cartId = await cartModel.findOne({ _id: cid });
  //     //Si lo encuentra:
  //     if (cartId) {
  //       const pExists = cartId.products.find((p) => p.product === pid);
  //       if (pExists) {
  //         pExists.quantity + 1;
  //       } else {
  //         cartId.products.push({ product: pid, quantity: 1 });
  //       }
  //     } else {
  //       return console.error(`Cart Id inexistente`);
  //     }

  //     await cartId.save();
  //   } catch (error) {
  //     console.log(`Error al actualizar carrito: ${error}`);
  //     return false;
  //   }
  // }

  // async deleteAll() {
  //   await fs.promises.writeFile(this.path, JSON.stringify([]), 'utf-8');
  // }
}

export default CartManager;
