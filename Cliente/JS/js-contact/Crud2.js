/* Cruds y JS */

"use strict"
/* conexion a la base de datos */
const db = firebase.firestore();



/* 1. Crear objetos*/
const coleccionSTR = "Contactenos";
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

/* 7. CONFIGURAR EL SUBMIT */
form.addEventListener("submit", async (ev)=>{
    ev.preventDefault();

    let Nombre = form.txtNombreContacto.value;
    let Correo = form.txtEmailContacto.value;
    let Consulta = form.txtConsultasContacto.value
    let Sugerencia = form.txtSugerenciasContacto.value


    if (!editStatus){
        await onInsert({ Nombre, Correo,Consulta,Sugerencia });
        //alert("Registro almacenado correctamente!");
        Toastify({
            text: "Se ha enviado tu informe al contactenos ",
            close: true,
            duration: 3000                        
            }).showToast();
    }
    
    editStatus = false;
    idSeleccionado = "";
    form.btnGuardar.innerText = "Guardar";

    form.reset();

})