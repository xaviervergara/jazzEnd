# Intro

Por lo general express y todos los frameworks de backend se suelen organizar en distinas carpetas, por lo general la carpeta src (source)
y dentro suelen tener un app.js y este es el punto de partida de nuestra aplicacion.
Alli dentro no usamos mas require para traernos los modulos. Usaremos sin embargo una metodologia mas moderna. Para esto:

- Vamos al package.json y debajo de "main:" ponemos "type": "module"
- en app.js de ahora en mas traemos los modulos importandolos con esta sintaxis `import express from 'express'`

## Configurar main de package.json

#### Para poder correr el comando nodemon /ruta mas acotadamente:

- Vamos al package.json y en "main" colocamos la ruta donde inicializa el server. En este caso "clase_6-servidoresWeb/src/app.js"
- La proxima vez que inicializamos el server directamente ejecutamos el comando "nodemon main" y se inicializa!
