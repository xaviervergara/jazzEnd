// EJERCICIO

// Calculadora positiva con promesas

// ¿Cómo lo hacemos? Se crearán un conjunto de funciones gestionadas por promesas y un entorno ASÍNCRONO  donde podremos ponerlas a prueba
// Definir función suma:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos sumandos sea 0
// En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación innecesaria”.
// En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores positivos
// Definir función resta:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
// En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando “Operación inválida
// En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La calculadora sólo puede devolver valores positivos”

// Definir una función multiplicación:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores sea negativo
// Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos
// Definir la misma función división utilizada en esta clase.
// Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y try/catch

const suma = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a === 0 || b === 0) {
        reject('Operacion innecesaria');
      } else if (a + b < 0) {
        reject('La calculadora sólo debe devolver valores positivos');
      } else {
        resolve(a + b);
      }
    }, 4587);
  });
};

// suma(0, 0)
//   .then((resultado) => console.log(resultado))
//   .catch((error) => console.log(error));

const resta = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a === 0 || b === 0) {
        reject('Operacion invalida');
      } else if (a - b < 0) {
        reject('La calculadora sólo debe devolver valores positivos');
      } else {
        resolve(a - b);
      }
    }, 2000);
  });
};

const multi = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        reject('La calculadora solo acepta valores positivos');
      } else if (a * b < 0) {
        reject('La calculadora sólo debe devolver valores positivos');
      } else resolve(a * b);
    }, 5123);
  });
};

const dividir = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b === 0) {
        reject('No se pudo resolver la operacion');
      } else {
        resolve(a / b);
      }
    }, 3254);
  });
};

const calculos = async () => {
  try {
    const resultado = await resta(7, 8);
    console.log(resultado);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Operacion finalizada');
  }
};

calculos();
