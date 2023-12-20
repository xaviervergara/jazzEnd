// Manager de usuarios

// El Manager debe vivir en una clase en un archivo externo llamado ManagerUsuarios.js
// El método “Crear usuario” debe recibir un objeto con los campos:
// Nombre
// Apellido
// Edad
// Curso
// El método debe guardar un usuario en un archivo “Usuarios.json”, deben guardarlos dentro de un arreglo, ya que se trabajarán con múltiples usuarios

// El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json y devolver el arreglo correspondiente a esos usuarios

const fs = require('fs');

class ManagerUsuarios {
  constructor() {
    this.usuarios = [];
  }

  //tambien se pueden crear metodos asincronos  de esta manera!!
  async crearUsuario(user) {
    //validar que esten los campos completos del user para escribir el archivo
    if (!user.nombre || !user.apellido || !user.edad || !user.curso) {
      return console.log('Usuario incompleto');
    }
    this.usuarios.push(user);

    //una vez pusheado, el array se convierte en JSON
    let matrixToJson = JSON.stringify(this.usuarios);

    try {
      await fs.promises.writeFile('./Usuarios.json', matrixToJson, 'utf-8');
    } catch (error) {
      console.error('No se pudo escribir el archivo');
    }
  }

  async consultarUsuarios() {
    try {
      let file = await fs.promises.readFile('./Usuarios.json', 'utf-8');
      //file va a tener formato JSON, en la linea de abajo lo parseamos a formato objeto
      let data = JSON.parse(file);
      //la ejecucion de este metodo, nos consolea el array de objetos
      console.log(data);
    } catch (error) {
      console.error(`No se pudo leer archivo: ${error}`);
    }
  }
}

//ya que es todo asincrono, hacemos especificamente una funcion asincrona
//para testear la clase ManagerUsuarios. si se prueba sincronicamente quiza
//no de tiempo a que se ejecute del todo.
const test = async () => {
  try {
    const managerUsuarios = new ManagerUsuarios();
    //creamos algunos objetos
    const user1 = {
      nombre: 'xavier',
      apellido: 'vergara',
      edad: 30,
      curso: 'backend',
    };
    const user2 = {
      nombre: 'francisco',
      apellido: 'villegas',
      edad: 20,
      curso: 'frontend',
    };

    const user3 = {
      nombre: 'rodrigo',
      apellido: 'paniagua',
    };
    //usamos esos objetos de parametro para la funcion de crear usuario
    await managerUsuarios.crearUsuario(user1);
    await managerUsuarios.crearUsuario(user2);
    await managerUsuarios.crearUsuario(user3);

    //obtenemos el array de objetos en formato de objeto normal
    let data = await managerUsuarios.consultarUsuarios();
    //data va a ser entonces igual a lo que devuelve el metodo consultarUsuarios()
    //de esta manera cuando retornamos data, implica el consologueo del array de objetos
    return data;
  } catch (error) {
    console.log(`no se puede realizar la operacion: ${error}`);
  }
};

test();
