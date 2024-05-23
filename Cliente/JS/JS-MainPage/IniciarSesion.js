"use strict"

/* CONEXION */
const db = firebase.firestore();

/*OBJETOS */
const coleccionStr = "Login";
var editStatus = false;
var idSeleccionado = "";

const form = document.querySelector("#loginform");
const table = document.querySelector("#tblDatos>tbody");



const findAll = () => db.collection(coleccionStr).get();

const findById = paramId => db.collection(coleccionStr).doc(paramId).get();

const onFindAll = callback => db.collection(coleccionStr).onSnapshot(callback);

const onInsert = newContacto => db.collection(coleccionStr).doc().set(newContacto);

const onUpdate = (paramId, newContacto) => db.collection(coleccionStr).doc(paramId).update(newContacto);

const onDelete = paramId => db.collection(coleccionStr).doc(paramId).delete();


/* Configurar los diferentes botones */
const btnRegistrar = document.querySelector("#btnRegistrar");

const btnLogin = document.querySelector("#btnLogin");

/* configurarAutenticacion */

/*btnRegistrar.addEventListener("click", async (ev) =>{
    ev.preventDefault();

    let Nombre = document.querySelector('#txtNombreRegistro').value;
    let Carrera = document.querySelector('#txtCarreraregistro').value;
    let email = document.querySelector("#txtRegistroEmail").value;
    let password= document.querySelector("#txtRegistroPassword").value;
        
   if(!editStatus){  
    if (email.length >0 && password.length >0) {
        await onInsert({ Nombre,Carrera,email, password });
        Toastify({
            text: "Se ha registrado tu usuario Correctamente",
            close: true,
            duration: 3000

        }).showToast();
        document.querySelector("#txtNombreRegistro").value = "";
        document.querySelector("#txtCarreraregistro").value = "";
        document.querySelector("#txtRegistroEmail").value = "";
        document.querySelector("#txtRegistroPassword").value = "";
        
     
        
    }else{
    console.log("Errro al Crear Usuario" + error.message);
    }
    window.location.href = "Login.html"; 
        
}

});*/



// Escuchar el evento de clic en el botón de inicio de sesión
btnLogin.addEventListener("click", async (ev) => {
    ev.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    const email = document.getElementById("txtLoginEmail").value;
    const password = document.getElementById("txtLoginPassword").value;

    try {
        // Obtener la referencia a la colección "login" en Firestore
        const loginCollection = firebase.firestore().collection("Login");

        // Consultar la colección para encontrar el usuario con el email y contraseña proporcionados
        const querySnapshot = await loginCollection
            .where("email", "==", email)
            .where("password", "==", password)
            .get();

        // Verificar si se encontró un usuario
        if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();

            // Redirigir según el correo electrónico
            if (user.email.includes("@admin")) {
                // Redirigir a la página de administrador
                document.querySelector("#txtLoginEmail").value = "";
                document.querySelector("#txtLoginPassword").value = "";
        
                window.location.href = "/Admin/adminconsulta.html";
            } else {
                // Redirigir a la página de clientes
                document.querySelector("#txtLoginEmail").value = "";
                document.querySelector("#txtLoginPassword").value = "";
                window.location.href = "Index.html";
            }
        } else {
            console.log("Usuario y contraseña no válidos");
        }
    } catch (error) {
        console.error("Error de inicio de sesión:", error.message);
    }
});