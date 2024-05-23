
"use strict"

/* CONEXION */
const db = firebase.firestore();

/*OBJETOS */
const coleccionStr = "SugerenciasLibro";
var editStatus = false;
var idSeleccionado = "";

const form = document.querySelector("#frm-libro");
const table = document.querySelector("#tblDatos>tbody");



const findAll = () => db.collection(coleccionStr).get();

const findById = paramId => db.collection(coleccionStr).doc(paramId).get();

const onFindAll = callback => db.collection(coleccionStr).onSnapshot(callback);

const onInsert = newContacto => db.collection(coleccionStr).doc().set(newContacto);

const onUpdate = (paramId, newContacto) => db.collection(coleccionStr).doc(paramId).update(newContacto);

const onDelete = paramId => db.collection(coleccionStr).doc(paramId).delete();


/* BUSQUEDA */
window.addEventListener("load", async ()=>{
    
    await onFindAll((query)=>{
        table.innerHTML = "";
        
        query.forEach(documento => {
            let dato = documento.data();
            table.innerHTML += `
                                <tr>
                                    <td>${dato.Nombre}</td>
                                    <td>${dato.Correo}</td>
                                    <td>${dato.Libro}</td>
                                    
                                    <td>
                                        <button class="btn btn-warning btn-editar mx-1" data-id="${documento.id}">Editar</buton>
                                        <button class="btn btn-danger btn-borrar mx-1" data-id="${documento.id}">Borrar</buton>
                                    </td>
                                </tr>
                                `;
        });

        
        const btnBorrar = document.querySelectorAll(".btn-borrar");

        btnBorrar.forEach(btn =>{
            btn.addEventListener("click", async ev =>{
                //console.log(ev.target.dataset.id);
                if (confirm("Desea borrar el registro?")){
                    await onDelete(ev.target.dataset.id);
                    //alert("Registro eliminado correctamente!")
                    Toastify({
                        text: "Registro eliminado correctamente!",
                        close: true,
                        duration: 3000                        
                        }).showToast();
                }
            });
        });

        const ContactenosPFRef = db.collection('ContactenosPF');
        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn =>{
            btn.addEventListener("click", async ev =>{
                const docSeleccionado = await findById(ev.target.dataset.id);
                console.log(docSeleccionado);
                const contactoSeleccionado = docSeleccionado.data();

                form.txtNombreUsuario.value = contactoSeleccionado.Nombre
                form.txtEmailUsuario.value = contactoSeleccionado.Correo;
                form.txtSugerenciasLibro.value = contactoSeleccionado.SugerenciaLibro;
                form.btnGuardar.innerText = "Modificar";

                editStatus = true;
                idSeleccionado = ev.target.dataset.id;
            });
        });




    });

});


/* 7. CONFIGURAR EL SUBMIT */
form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    let Nombre = form.txtNombreUsuario.value;
    let Correo = form.txtEmailUsuario.value;
    let Libro = form.txtSugerenciasLibro.value;

    if (editStatus) {
        // Update existing record
        await onUpdate(idSeleccionado, { Nombre,Correo, Libro });
        Toastify({
            text: "Registro modificado correctamente!",
            close: true,
            duration: 3000
        }).showToast();
    } else {
        // Insert new record
        await onInsert({ Nombre,Correo, Libro });
        Toastify({
            text: "Se ha enviado tu informe gracias por la sugerencia",
            close: true,
            duration: 3000
        }).showToast();
    }

    editStatus = false;
    idSeleccionado = "";
    form.btnGuardar.innerText = "Guardar";
    form.reset();
});


    
    // Actualizar la sección de comentarios
  

    // ... (tu código actual)
 // Función para actualizar la sección de comentarios

 function loadCommentsFromFirestore() {
    onFindAll((query) => {
        const Contactos = [];
        query.forEach((documento) => {
            let dato = documento.data();
            Contactos.push({ Telefono: dato.Telefono, Correo: dato.Correo });
        });
        updateCommentsContainer(Contactos);
    });
}

// Cargar los comentarios almacenados al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    loadCommentsFromFirestore();
});

