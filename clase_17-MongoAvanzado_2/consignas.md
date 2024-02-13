# EJERCICIO EN VIVO #1

### Se desea gestionar una base de datos para una pizzería. Dado un conjunto de órdenes:

### Definir las ventas totales de los diferentes sabores para las pizzas medianas.

## Primera petición: Definir las ventas de los diferentes sabores de las pizzas medianas.


### El equipo de ventas corrobora que hay bajas en el número de peticiones de pizzas medianas y necesita confirmar el monto general que ha habido en las órdenes del tamaño “mediano” (ésto debido a que fue el tamaño protagónico de su última campaña de marketing). 

### Ahora toca analizar los sabores y corroborar cuáles están brindando una mayor rentabilidad, y cuáles deberían salir o sustituirse por un nuevo sabor. 


### ¿Qué debería hacer nuestra aggregation?

- Primero, una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.

- Segundo, agrupar las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores.

___

# EJERCICIO #2 Agrupacion de estudiantes

### Realizar las siguientes consultas en una colección de estudiantes

### Los estudiantes deben contar con los datos:
- first_name : Nombre
- last_name : Apellido
- email: correo electrónico
- gender: género
- grade: calificación
- group : grupo

### Una vez generados tus datos de prueba:

1. Obtener a los estudiantes agrupados por calificación del mejor al peor
2. Obtener a los estudiantes agrupados por grupo.
3. Obtener el promedio de los estudiantes del grupo 1B
4. Obtener el promedio de los estudiantes del grupo 1A
5. Obtener el promedio general de los estudiantes.
6. Obtener el promedio de calificación de los hombres
7. Obtener el promedio de calificación de las mujeres.

# <span style='color: gold'> Hands on lab

## Sistema de paginación de estudiantes

### ¿Cómo lo hacemos? Se creará una vista simple con Handlebars donde se podrán mostrar los estudiantes

- Los estudiantes serán mostrados en la vista “/students”
- Debe existir un enlace “Anterior”” para regresar a los estudiantes anteriores, siempre que haya una página anterior
- Debe existir un enlace “Siguiente” para continuar con la paginación de estudiantes, siempre que haya una página siguiente
- Debe indicarse la página actual.
- Todo debe vivir en un servidor de express escuchando en el puerto 8080.


<span style='color: blue'>