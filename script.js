/*let authBtn = document.querySelector('.auth_button');

authBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    window.location.href = 'page.html';
}) */

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message || result.error);
    } catch (error) {
      alert("Error: " + error.message);
    }
  });