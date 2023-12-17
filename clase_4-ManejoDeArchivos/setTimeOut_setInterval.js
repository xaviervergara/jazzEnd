const foo = (cb) => {
  setTimeout(() => {
    cb();
  }, 3000);
};

console.log("empezo el programa");
foo(() => console.log("hola mundo"));
console.log("termino el programa");

// empezo el programa
// termino el programa
// hola mundo

// ____

console.log("Comienza setInterval");
let count = 0;
const intervalo = setInterval(() => {
  console.log(count);

  count++;

  if (count > 5) {
    clearInterval(intervalo);
  }
}, 178);

console.log("Termina setInterval");
