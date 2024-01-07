const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
    // this.id = 0; usamos cart.length
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      console.log(`Error al traer carritos: ${error}`);
      return [];
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const productById = carts.find((p) => p.id === id);
      return productById;
    } catch (error) {
      console.log(`Error al traer carritos: ${error}`);
      return [];
    }
  }

  async addCart() {
    try {
      //No nos manejamos con un array de carritos dentro de la clase, sino
      //directamente con el contenido del archivo json que escribimos
      const carts = await this.getCarts();
      carts.push({
        id: carts.length + 1,
        products: [],
      });
      await fs.promises.writeFile(this.path, JSON.stringify(carts), 'utf-8');
      return true;
    } catch (error) {
      console.log(`Error al agregar carrito: ${error}`);
      return false;
    }
  }
}

module.exports = CartManager;
