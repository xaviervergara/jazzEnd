//traemos el boton de add to cart
const buttons = document.getElementsByClassName('btn_addToCart');

//traemos el boton de logout
const logoutBtn = document.getElementById('logoutBtn');

//LOGICA PARA EL BOTON ADD PRODUCT TO CART

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

//LOGICA PARA EL BOTON LOGOUT

logoutBtn.addEventListener('click', async (event) => {
  const result = await fetch('http://localhost:8080/api/sessions/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  const { redirect } = await result.json();
  window.location.href = redirect; //averiguar por esto
});
