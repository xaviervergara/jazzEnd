const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async (event) => {
  const result = await fetch('http://localhost:8080/api/sessions/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  const { redirect } = await result.json();
  window.location.href = redirect; //averiguar por esto
});
