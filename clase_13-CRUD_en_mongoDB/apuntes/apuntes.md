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

### not equal
```js 
colegio> db.estudiantes.find({nombre: {$ne: 'Julian'}})
//Operador not equal: trae todos menos a julian
```
### or
````js 
colegio> db.estudiantes.find({$or: [{edad: 32},{edad: 18}]})
//Operador or: trae usuarios de 32 o 18 años

db.usuarios.find({$or: [{ edad: { $gt: 18 } },  { etiqueta: "VIP" }]})
//Trae usuarios de 18 años y usuarios con etiqueta vip, sin importar que los usuarios cumplan las dos condiciones.
//pueden cumplir solo una e igual los trae

````
### and
```js
colegio> db.estudiantes.find({$and: [{curso: 6},{sexo:'F'}]})
//Trae documentos que cumplan las dos condiciones
```
### exists
```js
colegio> db.estudiantes.find({sexo: {$exists: true}})
//Trae elementos que cuenten con la propiedad "sexo"
```

### distinct

```js
colegio> db.estudiantes.distinct('sexo')
//trae cada uno de los valores diferentes que existen dentro de la propiedad que se busca
```

<span style="color:Goldenrod"> </span>

<span style="color:khaki"> </span>