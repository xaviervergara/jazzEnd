# CRUD

## CRUD es un acrónimo que hace referencia a las cuatro operaciones fundamentales de una base de datos:

- C : Create (Crear un dato, insertarlo en la base de datos)
- R : Read (Leer un dato, mostrarlo al cliente)
- U :  Update (Actualizar un dato, cambiar su información interna)
- D : Delete (Eliminar un dato, removerlo de nuestra colección


# <span style="color:Chocolate"> Comandos de apoyo

En nuestro cliente CLI contamos con comandos que, si bien **NO** forman parte de la clasificación del CRUD, son útiles para poder gestionar correctamente nuestra base de datos.

-  <span style="color: khaki">show dbs:</span> Muestra las bases de datos existentes.
-  <span style="color: khaki">use -db name-:</span> Crea una nueva base de datos (en caso de no existir) y se posiciona sobre ella 
-  <span style="color: khaki">db:</span> Muestra en qué base de datos estamos posicionado.
-  <span style="color: khaki">show collections:</span> Muestra todas las colecciones disponibles en la base de datos - posicionada.
-  <span style="color: khaki">db.createCollection(name):</span> Crea una colección en la base de datos posicionada.
-  <span style="color: khaki">db.dropDatabase():</span> Elimina la base de datos actual.
-  <span style="color: khaki">db.collection.drop():</span> Elimina la colección de la base de datos posicionada.




# <span style="color:Chocolate"> Primeros comandos CRUD: CR

- <span style="color: khaki"> db.collection.insertOne(doc):</span> Agrega un nuevo documento a la colección seleccionada.
- <span style="color: khaki"> db.collection.insertMany(docs):</span> Agrega múltiples documentos a la colección seleccionada (dado un arreglo de documentos).
- <span style="color: khaki"> db.collection.findOne(opt):</span> Busca un elemento que cumpla con los criterios de búsqueda (opt), devuelve el primer documento que cumpla con dicho criterio.
- <span style="color: khaki"> db.collection.find(opt):</span> Devuelve todos los documentos que cumplan con dicho criterio. 
- <span style="color: khaki"> db.collection.find(opt).pretty():</span> Añadido para hacer más presentables los resultados de un find().


# <span style="color: SteelBlue"> Conteo de datos

## Los comandos de conteo para determinar el número de documentos en una colección son:

- <span style="color: khaki">  db.collection.estimatedDocumentCount():</span> Cuenta el estimado más próximo  al número de documentos según su metadata.
- <span style="color: khaki">  db.collection.countDocuments(opt):</span> Cuenta los documentos que cumplan con el criterio definido en las opciones (opt).

## opt (options): agregando opciones

 En muchas consultas encontramos el elemento (opt), esto hace referencia a las opciones de filtros de búsqueda que podemos realizar al momento de buscar un valor, la sintaxis elemental de un opt es:

{propiedad:valor}

```js 
db.users.find({gender: "M"})
```
```js 
db.users.find({gender: "M", age: 35})
//se puede agremar mas de una propiedad!
```

# <span style="color: Goldenrod"> Filtros

### Los filtros pueden agregarse dentro de los elementos de criterio (opt) con ayuda del símbolo $, además, podemos agregar más de un filtro para asegurarnos que el documento se ajuste a criterios muy específicos.

**Entonces, la sintaxis general será:**

````js
db.coll.find( {key: {$operator: val}} ) 
````


# <span style="color: RoyalBlue"> MongoDB: Operadores para Filtros de Query

- <span style="color:khaki"> $ and: </span> Realiza operación AND -> sintaxis: ````{$and: [ {},{} ] }````
- <span style="color:khaki"> $ or: </span>Realiza operación OR -> sintaxis: ````{$or: [ {},{} ] }````
- <span style="color:khaki"> $ lt:  </span>Coincide con valores que son menores que un valor especificado.
- <span style="color:khaki"> $ lte: </span> Coincide con valores menores o iguales a un valor especificado.
- <span style="color:khaki"> $ gt : </span>Coincide con valores mayores a un valor especificado.
- <span style="color:khaki"> $ gte :</span> Coincide con valores mayores o iguales a un valor especificado.
- <span style="color:khaki"> $ ne : </span>Coincide con valores que no son iguales a un valor especificado.
- <span style="color:khaki"> $ eq : </span>Selecciona los documentos que son iguales a un valor especificado.
- <span style="color:khaki"> $ exists : </span> Selecciona los documentos según la existencia de un campo.
- <span style="color:khaki"> $ in : </span> Selecciona los documentos especificados en un array. 
sintaxis: ```` {key:{$in: [array of values] } }````
- <span style="color:khaki"> $ nin : </span> Coincide con ninguno de los valores especificados en un array.
- <span style="color:khaki"> $ size : </span> Coincide con el número de elementos especificados.
- <span style="color:khaki"> $ all : </span> Coincide con todos los valores definidos dentro de un array.
- <span style="color:khaki"> $ elemMatch : </span> Coincide con algún valor definido dentro del query.

# MongoDB: Búsqueda Avanzada

- <span style="color:khaki"> db.coll.distinct( val ):</span> devuelve un array con los distintos valores que toma un determinado campo en los documentos de la colección.
- <span style="color:khaki"> db.coll.find({doc.subdoc:value}):</span> Se utiliza para filtrar subdocumentos.
- <span style="color:khaki"> db.coll.find({name: /^Max$/i}):</span> filtra utilizando expresiones regulares


# <span style="color:CornflowerBlue	"> Proyecciones


### En ocasiones no necesitamos toda la información de un documento. Si tenemos un documento con 100 propiedades, podemos definir sólo las propiedades que queremos obtener. 

### Una proyección se incluye al momento de hacer una búsqueda, (siempre como segundo argumento) y es el equivalente a decirle a la base de datos: “sólo necesito ésto”

### Así, podríamos decir db.users.find({},{name:1}); Lo cual indica que, el campo “name” es el único que necesitamos obtener por parte del documento, ahorrándonos espacio y complejidad en el resultado.


## <span style="color:Goldenrod"> Sort

Sirve para poder hacer un ordenamiento de la información. El ordenamiento se define con 1 o -1 para hacer el ordenamiento ascendente o descendente respectivamente. 

La sintaxis es:

````js
db.collection.find().sort({val_A:1,val_B:-1})
````

La razón por la cual podemos agregar múltiples valores de ordenamiento, es en caso de que dos documentos tengan el mismo valor, podamos ordenarlos bajo otro criterio


## <span style="color:Goldenrod"> Skip y Limit


### <span style="color:khaki"> Skip:
 Omite el número de documentos indicados: Podemos usarlo cuando hagamos paginaciones, cuando necesitemos ignorar un valor que sabemos que es innecesario, etc.

Su sintaxis es: 
````js
.skip(offset)
````

### <span style="color:khaki"> Limit:

Limita el número de documentos devueltos. De manera que podamos hacer diferentes niveles de paginación (Tu página puede devolver 5 elementos por página, o bien 100, tú decides). 

Su sintaxis es: 
````js
.limit(num) 
````

## Ejemplos

## Not equal
```js 
colegio> db.estudiantes.find({nombre: {$ne: 'Julian'}})
//Operador not equal: trae todos menos a julian
```

## Equal
```js 
colegio> db.estudiantes.find({nombre: {$eq: 'Julian'}})
//Operador equal: trae unicamente a aquellos usuarios que tengan por nombre "julian"
```

## Or
````js 
colegio> db.estudiantes.find({$or: [{edad: 32},{edad: 18}]})
//Operador or: trae usuarios de 32 o 18 años

db.usuarios.find({$or: [{ edad: { $gt: 18 } },  { etiqueta: "VIP" }]})
//Trae usuarios de 18 años y usuarios con etiqueta vip, sin importar que los usuarios cumplan las dos condiciones.
//pueden cumplir solo una e igual los trae

````
## And
```js
colegio> db.estudiantes.find({$and: [{curso: 6},{sexo:'F'}]})
//Trae documentos que cumplan las dos condiciones
```
## Exists
```js
colegio> db.estudiantes.find({sexo: {$exists: true}})
//Trae elementos que cuenten con la propiedad "sexo"
```

## Distinct

```js
colegio> db.estudiantes.distinct('sexo')
//trae cada uno de los valores diferentes que existen dentro de la propiedad que se busca
```
## Sort

```js
db.estudiantes.find().sort({nombre: 1})
//ordena por nombre ascendentemente, osea alfabeticamente, si aplicammos -1 lo hace descendente
```
## Proyeccion

```js
db.estudiantes.find({},{nombre:1, _id:0})
//Nos trae todos los productos (el primer arg esta vacio), pero solo nos trae el nombre. Con "_id:0" omitimos que nos regrese el id de cada usuario.
```

```js
db.estudiantes.find({nombre:{$ne:'Jimena'}},{nombre:1, apellido:1, _id:0})
//Nos trae solo nombre y apellido de los users not equals al nombre "Jimena". Excluye el id.
```

```js
db.estudiantes.find(nombre:{$eq:'Jimena'},{nombre:1, _id:0})
//Nos trae los usuarios que se llaman jimena, pero solo nos trae el nombre
```

## Limit

```js
db.estudiantes.find({}, {nombre:1, apellido:1}).limit(3)
//Trae los primeros 3 usuarios de la proyeccion
```
## Skip

```js
db.estudiantes.find({}, {nombre:1, apellido:1}).skip(3)
//Saltea los 3 primeros usuarios y trae el resto. digamos que tenemos 12 usuarios, se saltea los primeros 3 y nos muestra los 9 restantes
```

## Skip y Limit: (Paginacion)

```js
//Supongamos que tenenmos una page que nos deja ver de a 5 elementos.
//Al estar en la pagina 1 vamos a ver los primeros 5, al estar en la pagina 2 vamos a omitir esos primeros 5 y a mostrar los 5 siguientes y asi. Por ende, tenemos que multiplicar el skip por el (numero de pagina -1 ) en el que estemos: Si estamos en la pagina 2, multiplicamos 1 x 5, de esta manera skip = 5: nos salteamos 5 productos. Mientras tanto, Limit sigue siendo de 5, es decir, sigue mostrando de 5 en 5.

//pagina 1
db.estudiantes.find({},{nombre:1, apellido:1}).limit(5)

//pagina 2
db.estudiantes.find({},{nombre:1, apellido:1}).limit(5).skip(5)

//pagina 3
db.estudiantes.find({},{nombre:1, apellido:1}).limit(5).skip(10)

```


# <span style="color:Goldenrod"> CRUD : U (Update)

### Las operaciones Update se pueden realizar de dos maneras: Actualizar un documento, o actualizar múltiples documentos. 

---

### db.collection.updateOne(query,update,option)
-  <span style="color:khaki">query:</span> sirve para filtrar qué elementos actualizar (usa los filtros iguales al find)
-  <span style="color:khaki">update:</span> Apartado para indicar qué actualizar de los documentos que cumplen con el filtro. Update tiene sus propios operadores como $set, $unset, $inc, $rename, $mul, $min, $max
- <span style="color:khaki"> option:</span> Opciones a tomar en cuenta para la actualización (como upsert, que inserta el valor en caso de que el documento a actualizar ni siquiera exista).

### db.collection.updateMany(query,update,options)
 #### Actualiza múltiples documentos que cumplan con el criterio. 

---

## Ejemplos:

### Set
```js
db.estudiantes.updateOne({ _id: ObjectId('65b32541fef457f2792e5810')},{$set: {nombre: 'Alberto'}})
//En este caso, tomamos un usuario a traves de su id, luego con set, actualizamos el campo nombre
```
### Unset

```js
db.estudiantes.updateOne({ _id: ObjectId('65b32541fef457f2792e5810')},{$unset: {nombre: 1}})
//En este caso, tomamos un usuario a traves de su id, luego con unset, eliminamos la propiedad: ahora ese user no tiene mas la propiedad nombre
```
### Rename

```js
db.estudiantes.updateOne({_id: ObjectId('65b32541fef457f2792e5810')}, {$rename: {nombre: 'user'}})
//En este caso con rename, renombramos el nombre de una propiedad anteriormente llamada "nombre", a "user"
```
### Inc

```js
db.estudiantes.updateOne({_id: ObjectId('65b32541fef457f2792e5810')},{$inc: {edad: 5}})
//En este caso, con "inc" incrementamos la edad del user en 5. El operador Inc no aplica para datos no numericos.
```

# <span style="color:Goldenrod"> CRUD : D (Delete)

## Nuestra última operación es para eliminar datos, si bien hay muchas variantes de una eliminación, sólo veremos las dos principales.

- <span style="color:khaki"> db.collection.deleteOne({key:val}) :</span> Elimina sólo el primer elemento que cumpla con el criterio, se usa principalmente para encontrar identificadores específicos. Se recomienda no utilizar si somos conscientes de que el valor a buscar no es repetido.
- <span style="color:khaki"> db.collection.deleteMany({key:val}) :</span>  Elimina todos los documentos que cumplan con el criterio, se usa cuando sabemos que más de un valor va a contar con ese valor y necesitamos hacer una limpieza general.





# <span style="color:IndianRed"> ULTIMO EJERCICIO

# Operaciones con Filtros

1. Listar todos los documentos de la colección clientes ordenados por edad descendente.
2. Listar el cliente más joven.
3. Listar el segundo cliente más joven.
4. Listar los clientes llamados 'Juan'
5. Listar los clientes llamados 'Juan' que tengan 29 años.
6. Listar los clientes llamados 'Juan' ó 'Lucia'
7. Listar los clientes que tengan más de 25 años.
8. Listar los clientes que tengan 25 años ó menos.
9. Listar los clientes que NO tengan 25 años.
10. Listar los clientes que estén entre los 26 y 35 años.
11. Actualizar la edad de Fede a 36 años, listando y verificando que no aparezca en el último listado.
12. Actualizar todas las edades de 25 años a 26 años, listando y verificando que aparezcan en el último listado.
13. Borrar los clientes que se llamen 'Juan' y listar verificando el resultado.
14. Eliminar además todos los documentos de estudiantes que hayan quedado con algún valor.



## <span style="color:LimeGreen"> Resuelve

1. 
```js
 db.estudiantes.find().sort({edad: -1})
 //Entrega lista de usuarios con edades descentendes (mayor a menor)
```

2. 
```js
 db.estudiantes.find({edad: {$exists: true}}).sort({edad: 1}).limit(1)
//Busca el user mas joven
```

3. 
```js
db.estudiantes.find({edad: {$exists: true}}).sort({edad: 1}).limit(1).skip(1)
//Busca el segundo user mas joven
```

4. 
```js
db.estudiantes.find({nombre: {$eq: 'Juan'}})
//Lista a todos los users llamados juan
```

5. 
```js
db.estudiantes.find({edad:29, nombre: 'Juan'}) 
//o bien
db.estudiantes.find({$and: [{nombre: 'Juan'}, {edad: 29}]})
//Lista a todos los users llamados juan con edad de 29 años
```

6. 
```js
db.estudiantes.find({$or:[{nombre: 'Juan'}, {nombre: 'Lucia'}]})
//Lista los usuarios llamados Juan o llamados Lucia
```
7. 
```js
db.estudiantes.find({edad: {$gt: 25 }})
//Lista los usuarios de mas de 25 años
```

8. 
```js
db.estudiantes.find({edad: {$lte: 25 }})
//Lista los usuarios menores o iguales a 25 años
```

9. 
```js
db.estudiantes.find({edad: {$ne: 25 }})
//Lista a todos los usuarios que no tienen 25 años
```

10.  
```js
db.estudiantes.find({$and: [{edad: {$gte: 26}},{edad: {$lte: 35}}]})
//Lista a todos los usuarios que esten entre 26 y 35 años
```

11.  
```js
db.estudiantes.updateOne({_id: ObjectId('65b6d8322ebadbb32943457f')}, {$set: {edad:36}})
//Cambia la edad deL user a 36 años
```

12.  
```js
db.estudiantes.updateMany({edad:25},{$inc: {edad: 1}})
//Incrementa la edad de todos los usuarios que tenian 25 años en 1
```


13.  
```js
db.estudiantes.deleteMany({nombre: 'Juan'})
//Elimina los usuarios con el nombre Juan
```

14.  
```js
db.estudiantes.drop()
//Elimina la coleccion estudiantes
```





<span style="color:IndianRed"> </span>

<span style="color:khaki"> </span>