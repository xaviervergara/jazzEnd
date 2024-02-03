import { productModel } from '../models/products.models.js';

class ProductManager {
  constructor() {}

  async addProduct(product) {
    try {
      await productModel.create(product);
    } catch (error) {
      console.error(`No se pudo agregar producto a la BD: ${error}`);
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      console.error(`No se pudo ingresar a la BD: ${error}`);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findOne({ _id: id }).lean();
      return product;
    } catch (error) {
      console.error(`Error al traer producto por Id ${error}`);
    }
  }

  async updateProduct(id, update) {
    try {
      await productModel.updateOne({ _id: id }, update);
    } catch (error) {
      console.error(`No se pudo actualizar producto: ${error}`);
    }
  }

  async deleteProduct(id) {
    try {
      await productModel.deleteOne({ _id: id });
    } catch (error) {
      console.error(`Error: no se pudo eliminar el producto: ${error}`);
    }
  }

  async deleteAll() {
    this.products = [];
    let toJson = JSON.stringify(this.products);
    await fs.promises.writeFile(this.path, toJson, 'utf-8');
  }
}

// ____________________
console.log('Directorio actual:', process.cwd());
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

  try {
    await productManager.addProduct(prod1);
    // await productManager.addProduct(prod2);
    // await productManager.addProduct(prod3);
    // await productManager.addProduct(prod4);
    // await productManager.addProduct(prod5);

    //   await productManager.getProducts();
    //   await productManager.updateProduct(1, prod5);
    //   await productManager.getProducts();
    //   console.log(await productManager.getProductById(2));
    // await productManager.deleteProduct(0);
    // await productManager.deleteProduct(2);
  } catch (error) {
    console.log`Error al testear: ${error}`;
  }
};

// test();
export default ProductManager;
