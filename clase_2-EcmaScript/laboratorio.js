// Realizar una clase “ProductManager” que gestione un conjunto de productos.

// Aspectos a incluir

// Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

// Cada producto que gestione debe contar con las propiedades:
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)
// Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// Validar que no se repita el campo “code” y que todos los campos sean obligatorios
// Al agregarlo, debe crearse con un id autoincrementable
// Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

// Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
// En caso de no coincidir ningún id, mostrar en consola un error “Not found”

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  addProduct(title, description, price, thumnbnail, code, stock) {
    const id = this.products.find((producto) => producto.code === code);
    if (id) {
      console.log(`El producto "${title}" ya existe`);
      return;
    }
    if ((!title, !description, !price, !thumnbnail, !code, !stock)) {
      console.log("Todos los campos son olbigatorios");
      return;
    }
    this.id++;

    return this.products.push({
      title,
      description,
      price,
      thumnbnail,
      code,
      stock,
      id: this.id,
    });
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    const producto = this.products.find(
      (producto) => producto.id === productId
    );
    if (!producto) {
      console.log("Not found");
      return;
    }
    return producto;
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "notebook Lenovo",
  "ta buenisima",
  10000,
  "www.google.com",
  1,
  90
);

productManager.addProduct(
  "notebok Dell",
  "ta pioola",
  500,
  "www.google.com",
  2,
  87
);

productManager.addProduct(
  "notebok Asus",
  "ta buenarda",
  689,
  "www.google.com",
  10,
  50
);

console.log(productManager.getProductById(67));
