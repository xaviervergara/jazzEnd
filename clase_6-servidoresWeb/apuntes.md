# OBJETO REQUEST

El objeto req cuenta con tres propiedades
principales: <span style='color:green'>**req.query, req.params, req.body**</span>

## req.param

Se utiliza cuando necesitamos obtener elementos
dinámicos desde la ruta que está llamando el cliente.
para poder definir un “parámetro” dentro de la ruta a
trabajar, basta con colocar el símbolo de dos puntos :
antes del parámetro, de esta manera, express reconoce
que queremos que ese elemento sea dinámico.

```js
app.get('/user-param/:nombre/:apellido', (req, res) => {
const { nombre, apellido } = req.params;
res.send(`Hola ${nombre} ${apellido}!`);
});`

```

## req.query

Como su nombre lo indica, query refiere a las múltiples consultas que se pueden hacer a un determinado endpoint, basta conque en la url coloquemos el símbolo ? , entonces express reconocerá que hay que meter información al objeto req.query para poder utilizarlo en el endpoint.

Cuando buscamos algo en nuestro navegador, llamamos a un endpoint haciendo un determinado query.

### Importante!

Conforme incrementa el dinamismo en las urls, es importante configurar el servidor para que reciba datos complejos desde la url, por ello hay que utilizar la línea:

```js
app.use = express.urlencoded({ extended: true });
```

La línea anterior permitirá que el servidor pueda interpretar mejor los datos complejos que viajen desde la url, y mapearlos correctamente en el req.query
