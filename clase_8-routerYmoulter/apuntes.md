# Router en Express

Un router en express nos permitirá separar los endpoints “comunes” en entidades separadas que fungirán como “mini aplicaciones”, las cuales tomarán peticiones que concuerden con dicho endpoint y así redireccionarse a esta mini aplicación.

De esta manera, nuestro código resultará más organizado, y las diferentes entidades tendrán aislado el comportamiento interno, como configuraciones, middlewares, etc.

En la clase anterior nos encontrábamos con un problema: Al ver que había muchas rutas “iguales” que sólo diferían en métodos, nos dimos cuenta de que el código podría tornarse bastante engorroso.

En la clase anterior, mostramos un ejemplo con “usuarios”, ¿pero qué pasaría si tuviéramos…?

- Usuarios
- Productos
- Tickets
- Eventos
- Membresías
- Transportes
- Sucursales

¿Cuántos métodos atiborrados tendríamos en un solo archivo?

# Archivos estáticos

### ¿Cómo funciona?

- Nuestro servidor tiene la posibilidad de alojar recursos que pueden ser visibles para el cliente de manera directa.
- Podemos configurar una carpeta para que el usuario pueda acceder y ver dichos recursos de manera directa sólo con acceder a la ruta donde se encuentra ubicada.
- En este curso y en proyectos profesionales podrás encontrar estos archivos en la carpeta “public”, haciendo referencia como dice el nombre, a recursos públicos de fácil acceso para el cliente.

### ¿Cuándo utilizarlos?

Los dos casos principales para los cuales encontrarás el uso de esta carpeta “public” para archivos estáticos son:

- Cuando necesitemos alojar imágenes y servirlas directamente al cliente.
- Cuando necesitemos alojar una página web en todos sus sentidos: html, css, js. En esta clase haremos una página sencilla para mostrar el alcance de public.

# ¿Cómo convertir una carpeta en un recurso estático?

Para poder utilizar los recursos de una carpeta de manera estática, basta conque en el servidor especifiquemos como “express.static” dicha carpeta con la siguiente sintaxis:

```js
app.use(express.static('public'));
```

Indicamos que, todo lo que viva en la carpeta public, podrá ser accedido directamente desde la carpeta public.

## Prefijo virtual

Para crear un prefijo virtual (donde el path de acceso no existe realmente en el sistema de archivos) para los archivos servidos por express.static, debemos especificar un path de acceso de montaje para el directorio estático:

```js
app.use('/static', express.static('public'));
```

# ¿Qué es un middleware?

### Seguramente te has dado cuenta de que que hemos utilizado mucho la sintaxis app.use.

Cada vez que utilizamos un app.use estamos utilizando un middleware. Éstas son operaciones que se ejecutan de manera intermedia entre la petición del cliente, y el servicio de nuestro servidor. **OSEA ENTRE REQ Y RES**

### Como lo indica el nombre: “middleware” hace referencia a un intermediario, **siempre se ejecuta antes de llegar al endpoint que corresponde.**

### Podemos utilizar un middleware para:

- Dar información sobre las consultas que se están haciendo (logs)
- Autorizar o rechazar usuarios antes de que lleguen al endpoint (seguridad)
- Agregar o alterar información al método req antes de que llegue al endpoint (formato)
- Redireccionar según sea necesario (router)
- En ciertos casos, finalizar la petición sin que llegue al endpoint (seguridad)

## Tipos de middleware

Una aplicación Express puede utilizar los siguientes tipos de middleware:

- **Middleware a nivel de aplicación**
- **Middleware a nivel endpoint**
- **Middleware a nivel del Router**
- **Middleware de manejo de errores**
- **Middleware incorporado**
- **Middleware de terceros**

---

### **Middlewares a nivel de aplicación**

Funcionan a nivel global, es decir cada vez que se ejecuta una peticion a la aplicacion.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Ejemplos de middlewares a nivel aplicación
//Los middlewares siempre se refieren con la palabra "use"
```

**Sintaxis de middleware**

```js
app.use((req, res, next))=>{
    const date = new Date()
    console.log(`Fecha: ${date.toIsoString()}`)
    next()
}
//El next nos sirve para indicar que luego de que terminemos la ejecucion,
//sigamos con el proximo middleware. SI NO LO UTILIZAMOS, la peticion se quedará
//pegada.
```

**En el codigo de arriba hicimos un middleware el cual loguea la fecha cada vez que hacemos cualquier peticion en cualquiera de las rutas de la aplicación**

---

### **Middlewares a nivel de endpoint**

Estos se van a aplicar a cada uno de los endpoints, (post, get etc..)

Dado el siguiente codigo donde:

```js
userRoutes.post('/', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send({ message: `Usuario agregado exitosamente!` });
});
```

recibimos un usuario y lo agregamos al array de usuarios.
Podemos validar con un middleware por ejemplo, que el cliente
ingrese tanto el campo nombre como apellido:

```js
const checkUser = (req, res, next) => {
  const user = req.body;
  if (!user.name || !user.lastname) {
    return res.status(400).send({ message: 'completar los campos' });
  }
  next();
};
//middleware para chequear si el cliente ingreso los datos solicitados
```

Por ultimo para utilizar este middleware:

```js
userRoutes.post('/', checkUser, (req, res) => {
  const user = req.body;
  users.push(user);
  res.send({ message: `Usuario agregado exitosamente!` });
});

// el middleware se coloca como segundo argumento antes del request.
// Esto quiere decir que primero se ejecuta el middleware y si se cumple la condicion
// pasa finalmente a hacer la peticion
```

---

### Middleware a nivel Router

Es cuando se aplica a un router en general. Por ejemplo, todo nuestro archivo user.routes.js
o mismo pets.routes.js

Para esto deberia ir a mi archivo app.js, vamos al montaje del enrutador, en este caso el de users,
y podemos; o desarrollar todo el middleware dentro del mismo montaje:

```js
app.use(
  '/api/users',
  (req, res, next) => {
    console.log(`Estoy utilizando la ruta USERS`);
    next();
  },
  userRoutes
);
```

O podemos sino, hacer el middleware aparte, como lo veniamos haciendo anteriormente y luego colocarlo como argumento antes del req:

```js
const crearMensaje = (req, res, next) => {
  console.log(`Estoy utilizando la ruta USERS`);
  next();
};

app.use('/api/users', crearMensaje, userRoutes);
```

**O bien podemos tener un archivo aparte con todos los middlewares e importarlos donde los necesitemos**

**En conclusion, cada vez que utilicemos una ruta de users, se va a aplicar la funcion del middleware**

---

### Middlewares Incorporados

La única función de middleware incorporado en Express es express.static. Esta función es responsable del servicio de archivos estáticos:

```js
app.use(express.static('public', options));
```

### express.static(root, [options])

- El argumento root especifica el directorio raíz desde el que se realiza el servicio de activos estáticos.
- El objeto options opcional puede tener las siguientes propiedades: dotfiles, etag, extensions, index, lastModified, maxAge, redirect, setHeaders

### Middleware de terceros

Podemos instalar y utilizar middlewares de terceros para añadir funcionalidad a nuestra aplicación. El uso puede ser a nivel de aplicación o a nivel de Router.

# Middleware de carga de archivos: <span style="color: DodgerBlue"> MULTER </span>

## ¿Qué es multer?

Multer es un middleware de terceros, pensado para poder realizar carga de archivos al servidor.

En ocasiones el cliente necesitará subir una imagen, un vídeo o un archivo, según sea nuestra aplicación, ello nos lleva a configurar nuestro servidor para soportar estos archivos y poder almacenarlos en donde nosotros le indiquemos.
**Al ser de terceros, necesitaremos instalarlo para poder utilizarlo.**

## <span style="color: khaki">1. Instalar multer</span>

MULTER es una dependencia de terceros, de manera que, al igual que express, necesitaremos instalarlo dentro de nuestro package.json con el comando:

```js
npm install multer
```

**Debemos corroborar que se encuentre dentro de las dependencias al mismo nivel que tenemos express instalado**

## <span style="color: khaki">2. Configurar multer en el proyecto actual </span>

- Una vez que tenemos MULTER instalado, podemos importarlo en nuestro proyecto y configurarlo donde lo necesitemos (puede ser directamente en app, o bien se recomienda hacerlo en un archivo al mismo nivel de app llamado “utils”)

- Contar con un uploader externo a app.js, brindará más dinamismo al momento de utilizarlo, ya que podemos colocarlo en el router que necesitemos y no necesariamente instanciarlo a nivel general

#### <span style="color: lightPink"> Por lo general cuando expandimos las funcionalidades de nuestro proyecto, como por ejemplo este caso en el que utilizamos multer para poder manejar la subida de archivos de parte del cliente, creamos una carpeta que por convencion se le da el nombre de "UTILS" </span>

Por lo tanto tendremos nuestra carpeta "UTILS" y ahi dentro el archivo "multer.js" en el cual haremos la configuracion del middleware: esta, se encuentra en la documentacion oficial.

```js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
//EN EL SEGUNDO ARGUMENTO DEL CALLBACK, VA NUESTRA RUTA DONDE QUEREMOS QUE SE ALOJEN LOS ARCHIVOS
//EN ESTE CASO SERIA 'PUBLIC/IMG', ASI TAL CUAL.
```

### <span style="color: goldenRod">STORAGE:</span>

Es donde vamos a guardar los archivos que vamos a subir

### <span style="color: goldenRod">DESTINATION:</span>

Es la ruta donde se van a guardar los archivos que subamos, tiene que ser una ruta existente porque sino se rompe

### <span style="color: goldenRod">FILENAME:</span>

Filename sirve para nombrar el archivo que subamos. Siempre se nombran a los archivos haciendolos dinamicos
para que nunca se pisen, porque si ya existe puede haber un error. En el ejemplo de arriba se utiliza Date.now(), que es la representacion numerica de los milisegundos hasta el dia de la fecha desde 1970, la cual siempre esta corriendo, en adicion a eso se lo multiplica por un numero aleatorio redondeado con un rango de 0 a 1.000.000.000 (1e9)-->uno + 9 ceros.

<span style="color: goldenRod"></span>

---

Por ultimo se exporta el modulo:

```js
const export upload = multer({ storage: storage });
```

Revisar el archivo multer.js del proyecto ya que es un tanto distinto, mas simplificado.

## <span style="color: khaki">3. Utilizar uploader</span>

Una vez que nuestro uploader está listo para utilizarse, podemos importarlo en el router que necesitemos y colocarlo en la ruta donde lo necesitemos, **recuerda que, al ser un middleware, éste va enmedio de la ruta y de la función callback (req,res).**

```js
router.post('/', uploader.single('file'), (req, res) => {});

//Donde 'file' es el nombre que le vamos a dar al archivo que queremos subir
```

Podemos utilizar el uploader de dos formas principalmente:

- uploader.single(‘nombre del campo’): permitirá subir un único archivo, su resultado estará en req.file
- uploader.array(‘nombre de campos’): permitirá subir múltiples archivos, su resultado estará en req.files

# Importante!

### <span style="color:steelblue">"multipart/form-data"</span><br>

Nosotros estamos recibiendo informacion a traves de formato json, de hecho configuramos nuestra app con el middleware que asi lo configura:

```js
app.use(express.json());
```

Es por esto que es de suma importancia, cuando armemos los formularios en HTML, agregar el atributo a la etiqueta FORM enctype con el valor de multipart-form data.

```html
<form action="/api/pets" method="post" enctype="multipart/form-data"></form>
```

De esta manera vamos a poder recibir distintos tipos de data
