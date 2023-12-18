const fs = require('fs');

const fileSysAsyncCb = () => {
  const filePath = './clase_4-ManejoDeArchivos/ejemploAsyncCallback.txt';
  //ESCRITURA
  //args = ruta archivo, contenido, codificacion, callback que maneja error por si falla
  fs.writeFile(filePath, 'Escribiendo archivo ', 'utf-8', (error) => {
    if (error) {
      return console.error('No se pudo escribir el archivo');
    }
    //LECTURA
    //args = ruta archivo, codificacion, callback que maneja el error y la data(lectura)
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return console.error('No se pudo leer el archivo');
      }
      console.log(data);
      // AGREGAR CONTENIDO
      //args = ruta archivo, contenido, codificacion, callback que maneja error por si falla
      fs.appendFile(filePath, `MODIFICANDO con append`, 'utf-8', (error) => {
        if (error) {
          return console.error(error);
        }
        //LECTURA ARCHIVO MODIFICADO
        fs.readFile(filePath, 'utf-8', (error, dataMod) => {
          if (error) {
            return console.error('No se pudo leer el archivo');
          }
          console.log(dataMod);
          //ELIMINAR
          fs.unlink(filePath, (error) => {
            if (error) {
              console.error('No se puede eliminar');
            }
          });
        });
      });
    });
  });
};
console.log('TREMENDO CALLBACK HELL');
fileSysAsyncCb();
