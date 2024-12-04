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

        if (!data.username || !data.password) {
            alert("Please fill in all fields.");
            return;
        }
        if (data.password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to register.");
            }

            const result = await response.json();
            alert(result.message || "User registered successfully!");
            window.location.href = "/index.html";
        } catch (error) {
            alert("Error: " + error.message);
        }
    });

