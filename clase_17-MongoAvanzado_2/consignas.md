# EJERCICIO EN VIVO #1

### Se desea gestionar una base de datos para una pizzería. Dado un conjunto de órdenes:

### Definir las ventas totales de los diferentes sabores para las pizzas medianas.

## Primera petición: Definir las ventas de los diferentes sabores de las pizzas medianas.


### El equipo de ventas corrobora que hay bajas en el número de peticiones de pizzas medianas y necesita confirmar el monto general que ha habido en las órdenes del tamaño “mediano” (ésto debido a que fue el tamaño protagónico de su última campaña de marketing). 

### Ahora toca analizar los sabores y corroborar cuáles están brindando una mayor rentabilidad, y cuáles deberían salir o sustituirse por un nuevo sabor. 


### ¿Qué debería hacer nuestra aggregation?

- Primero, una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.

- Segundo, agrupar las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores.
