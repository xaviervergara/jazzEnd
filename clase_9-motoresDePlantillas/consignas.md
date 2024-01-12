# Datos personales

**Basándonos en el ejemplo anterior, desarrollar una vista web que permita mostrar los datos personales de múltiples usuarios.**

- Utilizar la misma estructura mostrada por el profesor, para poder levantar un servidor que utilice handlebars como motor de plantillas. 
- Configurar la plantilla para que muestre los siguientes datos: nombre, apellido, edad, correo, teléfono.
- Crear un array “users” que cuente con 5 usuarios de tipo objeto, cada uno con los datos mencionados arriba.
- Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla.
Observar los diferentes resultados en el navegador. 

---

# Handlebars con express

### Realizar un formulario en una nueva plantilla.

- Se creará un archivo “register.handlebars” como nueva plantilla, donde se colocará un form
- Dicho form debe servir para registrar un usuario, por lo que contará con nombre, correo, y contraseña
- Enviar los datos a una ruta POST ‘/user’, y guardar el usuario en un arreglo. Confirmar que el guardado se realice exitosamente. 
