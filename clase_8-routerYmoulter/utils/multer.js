import multer from 'multer';

//Configuramos el lugar donde se van a alojar los archivos que se suben al server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    //variable dinamica. Date.now arroja un numero de fecha en milisegundos
    //(cambia cada milisegundo), para darle un valor unico a file
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

export const uploader = multer({ storage });
