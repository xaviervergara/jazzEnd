# HANDS ON LAB.1

## Express Router

### ¿Cómo lo hacemos? Se crearán dos routers: users y pets.

- El router de users debe tener la ruta principal /api/users
- El router de pets debe tener la ruta principal /api/pets
- Ambos deben tener, de manera interna, un array para almacenarlos.
- Ambos deben contar con un método get en su ruta raíz para poder obtener el arreglo.
- Ambos deben contar con un método POST en su ruta raíz para poder agregar un usuario o mascota según sea el router.
- Conectar los routers al archivo app.js para tener listo el apuntador al router.
- Probar funcionalidad con Postman.

# CARPETA PUBLIC

### Partiendo del ejemplo anterior, recrear la estructura con un index.html para poder visualizarse en la ruta raíz.

- En este archivo deberá haber un formulario donde podremos ingresar una mascota a partir del método POST. Dicho POST conectará al endpoint raíz del router pets
- Configurar el router pets para que pueda recibir el json por parte del formulario (recordar express.json() y express.urlencoded({extended:true}))
- Verificar con POSTMAN que la información llegue al servidor y se guarde correctamente.
