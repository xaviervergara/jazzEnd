const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
  }

  async addProduct(product) {
    try {
      product.id = this.id++;

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return console.log('Por favor completar todos los campos');
      }
      this.products.push(product);

      let arrayToJson = JSON.stringify(this.products);

      await fs.promises.writeFile(this.path, arrayToJson, 'utf-8');
    } catch (error) {
      console.log(`No se pudo escribir el archivo: ${error}`);
    }
  }

  async getProducts() {
    try {
      let readFile = await fs.promises.readFile(this.path, 'utf-8');

      let fileParse = JSON.parse(readFile);

      return fileParse;
    } catch (error) {
      console.log(`Error al traer archivo ${error}`);
    }
  }

  async getProductById(id) {
    try {
      let productsArray = await fs.promises.readFile(this.path, 'utf-8');

      let productsArrayToObj = JSON.parse(productsArray);

      let productById = productsArrayToObj.find((product) => product.id === id);

      return productById;
    } catch (error) {
      console.log(`Error al traer archivo ${error}`);
    }
  }

  async updateProduct(id, update) {
    let productsArray = await fs.promises.readFile(this.path, 'utf-8');

    let productsArrayToObj = JSON.parse(productsArray);

    let productById = productsArrayToObj.find((product) => product.id === id);

    let arrayRemove = this.products.filter(
      (product) => product.id !== productById.id
    );

    update.id = id;

    arrayRemove.push(update);

    let arrayToJson = JSON.stringify(arrayRemove);

    await fs.promises.writeFile(this.path, arrayToJson, 'utf-8');
  }

  async deleteProduct(id) {
    let readFile = await fs.promises.readFile(this.path, 'utf-8');
    let fileParse = JSON.parse(readFile);
    let productById = fileParse.find((product) => product.id === id);

    let filterProducts = fileParse.filter(
      (product) => product.id !== productById.id
    );

    let toJson = JSON.stringify(filterProducts);
    this.products.push(toJson);

    await fs.promises.writeFile(this.path, toJson, 'utf-8');
  }
}

const test = async () => {
  let productManager = new ProductManager('./productos.json');

  let prod1 = {
    title: 'Notebook',
    description: 'Notebook gamer oferta color negro',
    price: 2000,
    thumbnail: 'url',
    code: 727,
    stock: 400,
  };
  let prod2 = {
    title: 'Mouse',
    description: 'Mouse gamer oferta color rojo',
    price: 500,
    thumbnail: 'url',
    code: 224,
    stock: 210,
  };

  let prod3 = {
    title: 'Teclado',
    description: 'Teclado oficina oferta color blanco',
    price: 300,
    thumbnail: 'url',
    code: 445,
    stock: 996,
  };

  let prod4 = {
    title: 'mouse',
    description: 'mouse optico color blanco',
    price: 20,
    thumbnail: 'url',
    code: 127,
    stock: 254,
  };

  let prod5 = {
    title: 'Monitor',
    description: 'Monitor curvo oferta 32 pulgadas',
    price: 3000,
    thumbnail: 'url',
    code: 531,
    stock: 642,
  };

  await productManager.addProduct(prod1);
  await productManager.addProduct(prod2);
  await productManager.addProduct(prod3);
  await productManager.addProduct(prod4);
  await productManager.addProduct(prod5);

  //   await productManager.getProducts();

  //   await productManager.updateProduct(1, prod5);
  //   await productManager.getProducts();

  //   console.log(await productManager.getProductById(2));

  // await productManager.deleteProduct(0);
  // await productManager.deleteProduct(2);
};

test();

module.exports = ProductManager;
