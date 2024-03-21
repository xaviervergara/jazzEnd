//EJERCICIO Nro_1

const sessionBtn = document.getElementById('sessionBtn');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loggedDiv = document.getElementById('loggedDiv');

sessionBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const result = await fetch('http://localhost:8080/api/session/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (result.status === 200 || result.status === 201) {
    loggedDiv.innerText = `${email} fue logueado`;
  } else {
    loggedDiv.innerText = `Unauthorized`;
  }

  console.log(`Esto es document.cookie: ${document.cookie}`);
});
