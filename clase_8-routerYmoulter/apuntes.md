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
