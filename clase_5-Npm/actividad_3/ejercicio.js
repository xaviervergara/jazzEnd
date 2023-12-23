const { DateTime } = require('luxon');

const fechaHoy = DateTime.now();
const fechaNac = DateTime.fromISO('1993-03-12');

if (fechaHoy.isValid && fechaNac.isValid) {
  const days = fechaHoy.diff(fechaNac).as('days');
  console.log(
    `Desde mi nacimiento hasta la fecha de hoy, han pasado solo ${Math.floor(
      days
    )} dias!`
  );
}
