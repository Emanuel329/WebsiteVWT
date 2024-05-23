/*
    CRUD JS & FIREBASE
    01/08/2023
*/
"use strict"

/* 2.CREAR OBJETO CONEXION */
const db = firebase.firestore();

/* 3. CREAR OBJETOS */
const coleccionStr = "contacto";

const form = document.querySelector("#frm");
const table = document.querySelector("#tblDatos>tbody");

/* 4. CONSTANTES DE MENSAJES */

/* 5. METODOS DEL CRUD */

const findAll = () => db.collection(coleccionStr).get();

const findById = paramId => db.collection(coleccionStr).doc(paramId).get();

const onFindAll = callback => db.collection(coleccionStr).onSnapshot(callback);

const onInsert = newContacto => db.collection(coleccionStr).doc().set(newContacto);

const onUpdate = (paramId, newContacto) => db.collection(coleccionStr).doc(paramId).update(newContacto);

const onDelete = paramId => db.collection(coleccionStr).doc(paramId).delete();


/* 6. GENERAR LA BUSQUEDA */
window.addEventListener("load", async ()=>{
    await onFindAll((query)=>{
        table.innerHTML = "";
        
        query.forEach(documento => {
            let dato = documento.data();
            table.innerHTML += `
                                <tr>
                                    <td>${dato.nombre}</td>
                                    <td>${dato.telefono}</td>
                                    <td>${dato.correo}</td>
                                    <td></td>
                                </tr>
                                `;
        });
    });

});

/* 7. CONFIGURAR EL SUBMIT */
form.addEventListener("submit", async (ev)=>{
    ev.preventDefault();

    let nombre = form.txtNombre.value;
    let telefono = form.txtTelefono.value;
    let correo = form.txtCorreo.value;

    await onInsert({ nombre, telefono, correo });

    form.reset();
})