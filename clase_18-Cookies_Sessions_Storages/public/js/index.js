const getCookieBtn = document.getElementById('getCookieBtn');

getCookieBtn.addEventListener('click', async (event) => {
  const response = await fetch('http://localhost:8080/getCookies');
  const cookies = await response.json();
  console.log({ user: cookies.user });
});
