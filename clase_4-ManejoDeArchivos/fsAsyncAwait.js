const fs = require("fs");

const writeAndRead = async () => {
  try {
    const filePath = "./clase_4-ManejoDeArchivos/asyncAwait.txt";
    //ESCRITURA
    //args = ruta archivo, contenido, codificacion
    await fs.promises.writeFile(filePath, "Escribiendo,", "utf-8");

    //LECTURA
    //args == ruta archivo, codificacion (LET LECTURA por si se hace un append)
    let lectura = await fs.promises.readFile(filePath, "utf-8");

    //MODIFICAR
    //args = ruta archivo, contenido, codificacion
    await fs.promises.appendFile(filePath, " agregando contenido", "utf-8");

    //LECTURA
    lectura = await fs.promises.readFile(filePath, "utf-8");

    console.log(lectura);

    //ELIMINAR
    //args = ruta archivo
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error(`No se pudo leer o escribir el archivo: ${error}`);
  }
};

writeAndRead();
