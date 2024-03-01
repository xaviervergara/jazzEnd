# Inyectar cookies en Frontend

## Crear una única vista de frontend en nuestro servidor express, la cual contará con dos campos input y  dos botones

- El primer campo input deberá ser el nombre del cliente.
- El segundo campo input deberá contener el correo electrónico
- El botón getCookie debe enviar una petición de tipo GET para recibir la cookie, solo mostrar por consola la cookie.
- El botón submit, deberá enviar una petición POST, la cual deberá crear una cookie con el formato {user:correoDelInput}
- La cookie debe tener un tiempo de vida de 10 segundos. Corroborar que la cookie se borre después del tiempo indicado.

___

# Sesiones de usuario en el server

## Realizar un programa de backend que establezca sesiones de usuarios en el servidor.

- Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de “Te damos la bienvenida”. 
- Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas. El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.
- Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre, solo se almacenará la primera vez que el cliente visite el sitio.
