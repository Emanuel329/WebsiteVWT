function evitarNumerosYCaracteresEspeciales(event) {
    const input = event.target;
    const inputValue = input.value;
    
    // Eliminar caracteres numéricos y especiales ingresados
    const newValue = inputValue.replace(/[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>?~]/g, '');
    
    // Actualizar el valor del campo de texto
    input.value = newValue;
  
    // Mostrar alerta con toastify
    if (newValue !== inputValue) {
      Toastify({
        text: "No se permiten números ni caracteres especiales en este campo.",
        duration: 3000,
        gravity: "bottom",
        backgroundColor: "#ff0000",
      }).showToast();
    }
  }
  function verificarLongitudContrasena(event) {
    const input = event.target;
    const inputValue = input.value;
  
    // Verificar longitud mínima de la contraseña
    if (inputValue.length < 7) {
      Toastify({
        text: "La contraseña debe tener al menos 7 caracteres.",
        duration: 3000,
        gravity: "bottom",
        backgroundColor: "#ff0000",
      }).showToast();
    }
  }
  
  
  