const fs = require('fs');
const crypto = require('crypto');

class UserManager {
  constructor(path) {
    this.users = [];
    this.path = path;
  }

  async crearUsuario(user) {
    try {
      if (!user.nombre || !user.apellido || !user.username || !user.password) {
        return console.log('Completar todos los campos');
      }

      const { nombre, apellido, username, password } = user;
      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');
      const newUser = {
        nombre,
        apellido,
        username,
        password: hashedPassword,
      };

      this.users.push(newUser);

      let data = JSON.stringify(this.users);

      await fs.promises.writeFile(this.path, data, 'utf-8');
    } catch (error) {
      console.log(`No se pudo guardar el usuario: ${error}`);
    }
  }

  async validarUsuario(userName, password) {
    try {
      let readFile = await fs.promises.readFile(this.path, 'utf-8');

      let data = JSON.parse(readFile);

      let userNameValidation = data.some((user) => user.username === userName);
      if (!userNameValidation) {
        return console.log(`No se encontro el usuario`);
      }
      let passwordValidation = data.some((user) => user.password === password);
      if (!passwordValidation) {
        return console.log(`La contraseña no coincide`);
      }
      if (userNameValidation && passwordValidation) {
        console.log(`Logueado`);
      }
    } catch (error) {
      console.log(`Error en la validacion: ${error}`);
    }
  }
}

const userManager = new UserManager('./Usuarios.json');

const test = async () => {
  let user1 = {
    nombre: 'xavier',
    apellido: 'vergara',
    username: 'decard',
    password: '123',
  };
  await userManager.crearUsuario(user1);

  //   await userManager.validarUsuario('decard', '123');
};

test();
