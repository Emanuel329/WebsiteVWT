/* Cruds y JS */

"use strict"
/* conexion a la base de datos */
const db = firebase.firestore();



/* 1. Crear objetos*/
const coleccionSTR = "ContatenosPF";
var  editStatus =false;
var idSeleccionado ="";



/* 2. constantes de mensajes*/


/* 3.  metodos de cruds */

const form = document.querySelector("#frm");

const findALL = () => db.collection(coleccionSTR).get();

const findID = paramID => db.collection(coleccionSTR).doc(paramID).get();

const onFindAll = callback => db.collection(coleccionSTR).onSnapshot(callback);

const onInsert = RegistroNuevo => db.collection(coleccionSTR).doc().set(RegistroNuevo);

const onUpdate = (paramID,nuevoRegistro) => db.collection(coleccionSTR).doc(paramID).update(nuevoRegistro);

const onDelete = paramID => db.collection(coleccionSTR).doc(paramID).delete();

// ... (código anterior)

/* 7. CONFIGURAR EL SUBMIT */
form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    let Telefono = form.txtTelefono.value;
    let Correo = form.txtCorreo.value;

    if (Telefono.length !== 8) {
        // Mostrar mensaje de error utilizando Toastify
        Toastify({
            text: "El número de teléfono debe tener 8 dígitos.",
            close: true,
            duration: 3000,
            backgroundColor: "blue"
        }).showToast();
        return; // Detener el proceso si el número no tiene 8 dígitos
    }

    if (!editStatus) {
        await onInsert({ Telefono, Correo });
        Toastify({
            text: "Se ha enviado tu informe al Doctor ",
            close: true,
            duration: 3000
            
        }).showToast();
    }

    editStatus = false;
    idSeleccionado = "";
    form.btnGuardar.innerText = "Guardar";

    form.reset();
});

// ... (código posterior)
