// Manager de usuarios

// El Manager debe vivir en una clase en un archivo externo llamado ManagerUsuarios.js
// El método “Crear usuario” debe recibir un objeto con los campos:
// Nombre
// Apellido
// Edad
// Curso
// El método debe guardar un usuario en un archivo “Usuarios.json”, deben guardarlos dentro de un arreglo, ya que se trabajarán con múltiples usuarios

// El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json y devolver el arreglo correspondiente a esos usuarios

const fs = require("fs");

class ManagerUsuarios {
  constructor() {
    this.usuarios = [];
  }

  crearUsuario(nombre, apellido, edad, curso) {
    const user = { nombre, apellido, edad, curso };

    this.usuarios.push(user);

    let matrixToJson = JSON.stringify(this.usuarios);

    const addUser = async () => {
      try {
        await fs.promises.writeFile("./Usuarios.json", matrixToJson, "utf-8");
      } catch (error) {
        console.error("No se pudo escribir el archivo");
      }
    };
    addUser();
  }

  consultarUsuarios() {
    const readUsers = async () => {
      try {
        let file = await fs.promises.readFile("./Usuarios.json", "utf-8");
        let data = JSON.parse(file);
        console.log(data);
      } catch (error) {
        console.error(`No se pudo leer archivo: ${error}`);
      }
    };
    readUsers();
  }
}

const managerUsuarios = new ManagerUsuarios();

managerUsuarios.crearUsuario("xavier", "vergara", 30, "Backend");
managerUsuarios.crearUsuario("damian", "gutierrez", 20, "frontEnd");
managerUsuarios.crearUsuario("morena", "sanchez", 50, "java");
managerUsuarios.crearUsuario("ariel", "gimenez", 23, "next.js");
managerUsuarios.crearUsuario("julia", "paez", 20, "Backend");
managerUsuarios.crearUsuario("damian", "gutierrez", 20, "frontEnd");
managerUsuarios.crearUsuario("morena", "sanchez", 50, "java");
managerUsuarios.crearUsuario("ariel", "gimenez", 23, "next.js");

setTimeout(() => {
  managerUsuarios.consultarUsuarios();
}, 5000);
