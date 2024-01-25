//Se importa el objeto Router, desestructurandolo del modulo express
import { Router } from 'express';
//Se crea una instancia del objeto Router
const petsRouter = Router();
//Importamos MULTER
import { uploader } from '../../utils/multer.js'; //se desestructura porque solo usamos export
//si hubiesemos usado export default, no habria que desestructurar.
//cuando se hace solo export se exporta todo el archivo, es por eso que hay que desesctructurar
//solo la funcionalidad que uno necesita.
//Cuando se hace un export default se indica que por default se exporta la funcionalidad
//a la que uno apunte. de esta manera se importa solo el archivo en si.

let pets = [];

//GET
petsRouter.get('/', (req, res) => {
  res.send({ pets });
});

//PUT
petsRouter.post('/', uploader.single('file'), (req, res) => {
  const pet = req.body;
  console.log(pet);
  //obtenemos el path del archivo (en la prop path del objeto req.file, se aloja la ruta del archivo)
  //es single, un solo archivo (req.FILE)
  //la ruta va a ser /public/img/nombre de archivo., para sacar la ruta public y que se guarde directamente
  // /img/nombre de archivo. se hace un split y si encuentra 'public' lo elimina. luego se vuelve a unir
  //sin espacios la ruta (string) usando ''. de esta manera esta ruta muestra directamente la imagen:
  //http://localhost:8080\\img\\1703732794862WhatsApp Image 2023-08-31 at 11.41.22 (1).jpeg
  //LO QUE NOS USAR THUMBNAIL DE MANERA DINAMICA
  const path = req.file.path.split('public').join('');
  //pusheamos todas las props que manda el cliente, y le sumamos thumbnail
  pets.push({ ...pet, thumbnail: path });

  res.send({ message: `Mascota agregada exitosamente!` });
});

//DELETE
petsRouter.delete('/', (req, res) => {
  pets = [];
  res.send({ message: 'Mascotas eliminadas' });
});
export default petsRouter;
