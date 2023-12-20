//JSON ES UN formato estándar de guardado y envío de archivos.

let persona = { nombre: "xavier", apellido: "vergara" };

//de objeto a formato JSON

let jsn = JSON.stringify(persona);

console.log(jsn);

//de JSON a objeto

let parse = JSON.parse(jsn);

console.log(parse);
