// Datos de usuario de ejemplo (esto debería estar en un servidor en un caso real)
const users = [
    { email: "usuario1@example.com", password: "pass1" },
    { email: "usuario2@example.com", password: "pass2" }
];

// Función para manejar el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar si el usuario existe
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Guardar el usuario en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        document.getElementById('message').innerText = "¡Inicio de sesión exitoso!";
        document.getElementById('message').style.color = "green";
        window.location.replace("../index.html");
        // Redirigir a otra página o mostrar contenido adicional
    } else {
        document.getElementById('message').innerText = "Email o contraseña incorrectos.";
        document.getElementById('message').style.color = "red";
    }
});

// Verificar si hay un usuario logueado al cargar la página
window.onload = function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('message').innerText = `Bienvenido de nuevo, ${loggedInUser.email}!`;
        document.getElementById('message').style.color = "green";
    }
};