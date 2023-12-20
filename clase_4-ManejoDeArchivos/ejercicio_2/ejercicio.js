// Lectura y escritura de archivos

// Escribir un programa ejecutable bajo node.js que realice las siguientes acciones:
// Abra una terminal en el directorio del archivo y ejecute la instrucción: npm init -y.
// Esto creará un archivo especial (lo veremos más adelante) de nombre package.json
// Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
// const info = {
//     contenidoStr: (contenido del archivo leído en formato string),
//     contenidoObj: (contenido del archivo leído en formato objeto),
//     size: (tamaño en bytes del archivo)
// }

// Muestre por consola el objeto info luego de leer el archivo
// Guardar el objeto info en un archivo llamado info.json dentro de la misma carpeta de package.json
// Incluir el manejo de errores (con throw new Error)
// Utilizar el módulo promises de fs dentro de una función async/await y utilizar JSON.stringify + JSON.parse para poder hacer las transformaciones json->objeto y viceversa

const fs = require("fs");

//OBJETO
const info = {
  contenidoStr: "",
  contenidoObj: {},
  size: 0,
};

const fileHandler = async () => {
  const filePath = "./clase_4-ManejoDeArchivos/ejercicio_2/package.json";

  try {
    let data = await fs.promises.readFile(filePath, "utf-8");

    let obj = JSON.parse(data);

    info.contenidoStr = data;

    info.contenidoObj = obj;

    const status = await fs.promises.stat(filePath);

    let size = status.size;

    info.size = size;

    console.log(info);

    //GUARDAR OBJETO INFO

    let infoJson = JSON.stringify(info);

    await fs.promises.writeFile(
      "./clase_4-ManejoDeArchivos/ejercicio_2/info.json",
      infoJson,
      "utf-8"
    );

    let lecturaInfoJson = await fs.promises.readFile(
      "./clase_4-ManejoDeArchivos/ejercicio_2/info.json",
      "utf8"
    );

    console.log(`Logueo de archivo con Objeto 'info' ${lecturaInfoJson}`);
  } catch (error) {
    console.log(`Error en el manejo de archivo: ${error}`);
  }
};

fileHandler();
