// SOCKET.IO CONFIG desde el cliente
//Todo esto esta en la docu de socket.io
// Creamos un socket

// console.log('directorio actual:', process.cwd());

const socket = io();

socket.on('realTimeProducts', (data) => {
  if (data) {
    const productList = document.getElementById('productList');

    productList.innerHTML = data
      .map((product) => `<p>${product.title}: $ ${product.price}</p>`)
      .join('');
  } else {
    console.error('No se recibieron datos del servidor');
  }
});
