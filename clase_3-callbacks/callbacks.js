const suma = (a, b, ...rest) => {
  let parcial = 0;
  rest.forEach((num) => (parcial += num));

  return a + b + parcial;
};

const resta = (a, b) => a - b;

const multiplicacion = (a, b) => a * b;

const division = (a, b) => a / b;

const operacion = (a, b, callback) => {
  return callback(a, b);
};

// _____

const dividir = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("No se pudo resolver la operacion");
    } else {
      resolve(num1 / num2);
    }
  });
};

dividir(2, 2)
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

const asyncAwait = async () => {
  try {
    const retultado1 = await dividir(2, 0);
    console.log(retultado1);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Operacion Finalizada");
  }
};

asyncAwait();

const multiplicar = (a, b, operacion) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b < 5) {
        reject("no se pudo realizar la opereta");
      }
      resolve(operacion(a, b));
    }, 2000);
  });
};

multiplicar(5, 3, multiplicacion)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
