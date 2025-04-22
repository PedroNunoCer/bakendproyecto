   // Al enviar el formulario
   document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se recargue

    // Obtener los valores del formulario
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    let confirmarContraseña = document.getElementById("confirmar_contraseña").value;

    // Verificar que las contraseñas coinciden
    if (contraseña !== confirmarContraseña) {
        alert("Las contraseñas no coinciden. Por favor, verifica.");
        return;
    }

    // Crear un objeto usuario
    let usuarioRegistrado = {
        nombre: nombre,
        email: email,
        usuario: usuario,
        contraseña: contraseña
    };

    // Guardar en localStorage (convertido a JSON)
    localStorage.setItem(usuario, JSON.stringify(usuarioRegistrado));

    // Mostrar el modal de éxito
    let modal = new bootstrap.Modal(document.getElementById('registroExitosoModal'));
    modal.show();

    // Limpiar el formulario
    document.getElementById("registroForm").reset();
});
