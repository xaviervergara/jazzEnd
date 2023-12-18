// ctrl +shift+p
// ext install deinsoftware.arrow-function-snippets
//snippet --> afee
const fs = require('fs');

const escribirYLeerArchivo = () => {
  //ESCRITURA
  //args para escribir = ruta y archivo, contenido, codificacion
  fs.writeFileSync(
    './clase_4-ManejoDeArchivos/ejemplo.txt',
    'Primera escritura de archivos',
    'utf-8'
  );

  //LECTURA
  //args para leer = ruta y archivo, codificacion
  let lectura = fs.readFileSync(
    './clase_4-ManejoDeArchivos/ejemplo.txt',
    'utf-8'
  );
  console.log(`El archivo contiene la siguiente información: ${lectura}`);

  //AGREGAR CONTENIDO
  //args para modificar = ruta y archivo, contenido, codificacion
  fs.appendFileSync(
    './clase_4-ManejoDeArchivos/ejemplo.txt',
    `
Agregando mas contenido utilizando Append`,
    'utf-8'
  );

  //LEEMOS DE VUELTA PARA ACTUALIZAR: (let lectura!, si se usa const, no se puede reasignar)

  lectura = fs.readFileSync('./clase_4-ManejoDeArchivos/ejemplo.txt', 'utf-8');

  console.log(`El archivo ha sido modificado: ${lectura}`);

  // ELIMINAR ARCHIVO
  //args para eliminar = ruta

  fs.unlinkSync('./clase_4-ManejoDeArchivos/ejemplo.txt');
};

escribirYLeerArchivo();
