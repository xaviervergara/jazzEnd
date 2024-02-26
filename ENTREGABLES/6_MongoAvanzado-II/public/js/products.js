const buttons = document.getElementsByClassName('btn_addToCart');
// const buttons = document.getElementsByTagName('button');

const addProductToCart = async (pId) => {
  try {
    const result = await fetch(
      `http://localhost:8080/api/carts/65d57df4e30691756b48475c/product/${pId}`,
      {
        // body: null, //si se manda body hacerle un JSON.strigify
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (result) {
      alert('Se agrego correctamente');
    } else {
      alert('No se pudo agregar');
    }
  } catch (error) {
    alert('No se pudo agregar');
  }
};

for (let button of buttons) {
  button.addEventListener('click', (event) => {
    addProductToCart(button.id);
  });
}
