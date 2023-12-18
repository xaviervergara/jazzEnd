// Almacenar fecha y hora

// Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual.
// Posteriormente leer el archivo y mostrar el contenido por consola.
// Utilizar el módulo fs y sus operaciones de tipo callback.

const fs = require('fs');

const fechaYHora = () => {
  let date = new Date().toLocaleString();

  fs.writeFile(
    './clase_4-ManejoDeArchivos/fechaYhora.txt',
    date,
    'utf-8',
    (error) => {
      if (error) {
        console.log('No se pudo escribir archivo');
      }
      fs.readFile(
        './clase_4-ManejoDeArchivos/fechaYhora.txt',
        'utf-8',
        (error, data) => {
          if (error) {
            console.log('No se pudo leer archivo');
          }
          console.log(data);
        }
      );
    }
  );
};

fechaYHora();
