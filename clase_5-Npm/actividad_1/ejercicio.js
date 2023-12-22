let contenedor = [];

for (let i = 0; i < 10000; i++) {
  contenedor.push(Math.floor(Math.random() * 20 + 1));
}

const objNum = {};

for (const numero of contenedor) {
  //js automaticamente convierte [numero] de valor numerico a string,
  //por eso es que funciona el bracket notation
  //__________
  //si el value es igual al value (cantidad de veces) es decir,
  //si ya existe el numero, le suma uno a la cantidad de apariciones.
  //recordemos que el value equivale a la cantidad de apariciones
  //si no hay value, osea, no existe el numero, el valor se inicializa
  //en 0 y automaticamente se le suma uno, es decir, el numero aparece
  //por primera vez
  objNum[numero] = (objNum[numero] || 0) + 1;
}

console.log(objNum);
