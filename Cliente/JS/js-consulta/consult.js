
"use strict"

/* CONEXION */
const db = firebase.firestore();

/*OBJETOS */
const coleccionStr = "consulta";
var editStatus = false;
var idSeleccionado = "";

const form = document.querySelector("#frm");
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
                                    <td>${dato.nombre}</td>
                                    <td>${dato.apellido}</td>
                                    <td>${dato.correo}</td>
                                    <td>${dato.comentario}</td>
                                    <td>${dato.respuesta}</td>
                                    <td>
                                        <button style="margin: 10px;" class="btn btn-danger btn-borrar mx-1" data-id="${documento.id}">Borrar</buton>
                                        <button class="btn btn-warning btn-editar mx-1" data-id="${documento.id}">Editar</buton>
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

        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn =>{
            btn.addEventListener("click", async ev =>{
                const docSeleccionado = await findById(ev.target.dataset.id);
                const contactoSeleccionado = docSeleccionado.data();

                form.txtCorreo.value = contactoSeleccionado.correo;
                form.txtComentario.value = contactoSeleccionado.comentario;
                form.txtRespuesta.value = contactoSeleccionado.respuesta;
                form.btnGuardar.innerText = "Modificar";

                editStatus = true;
                idSeleccionado = ev.target.dataset.id;
            });
        });


    });

});


/* 7. CONFIGURAR EL SUBMIT */
form.addEventListener("submit", async (ev)=>{
    
    ev.preventDefault();


    
    let correo = form.txtCorreo.value;
    let comentario = form.txtComentario.value;
    let respuesta = form.txtRespuesta.value;

    

    if (!editStatus){
        await onInsert({ nombre, apellido, correo, comentario, respuesta});


        //alert("Registro almacenado correctamente!");
        Toastify({
            text: "Registro almacenado correctamente!",
            close: true,
            duration: 3000                        
            }).showToast();
    }else{
        await onUpdate(idSeleccionado, { correo, comentario,respuesta });
        //alert("Registro actualizado correctamente!");
        Toastify({
            text: "Registro actualizado correctamente!",
            close: true,
            className: "alert alert-success",
            duration: 3000     
                   
            }).showToast();
    }
    
    
    editStatus = false;
    idSeleccionado = "";
    form.btnGuardar.innerText = "Guardar";
    form.reset();

    loadCommentsFromFirestore();



    
    // Actualizar la sección de comentarios
  

    // ... (tu código actual)
});
 // Función para actualizar la sección de comentarios

 function loadCommentsFromFirestore() {
    onFindAll((query) => {
        const comments = [];
        query.forEach((documento) => {
            let dato = documento.data();
            comments.push({ nombre: dato.nombre, comentario: dato.comentario, respuesta: dato.respuesta });
        });
        updateCommentsContainer(comments);
    });
}

// Cargar los comentarios almacenados al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    loadCommentsFromFirestore();
});

// ...

// Función para actualizar la sección de comentarios
function updateCommentsContainer(comments) {
    const commentsContainer = document.getElementById("commentsContainer");
    commentsContainer.innerHTML = ""; // Limpiar contenido existente

    comments.forEach((comment) => {
        const newCommentCard = `
            <div class="comment__card">
                <div class="pic center__display">${comment.nombre.charAt(0)}</div>
                <div class="comment__info">
                    <small class="nickname">${comment.nombre}</small>
                    <p class="comment">${comment.comentario}</p>
                    <div class="comment__bottom">
                        <div class="heart__icon--comment">
                            <i class="far fa-heart"></i>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="comment__card">
                <div class="pic center__display">A</div>
                <div class="comment__info">
                    <small class="nickname">Admin</small>
                    <p class="comment"> Estimad@ ${comment.nombre} su respuesta es,${comment.respuesta}</p>
                    <div class="comment__bottom">
                        <div class="heart__icon--comment">
                            <i class="far fa-heart"></i>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
        commentsContainer.innerHTML += newCommentCard;
    });
}

const btnAbrirModal = document.getElementById("btnAbrirModal");
const modal = document.getElementById("modal");

btnAbrirModal.addEventListener("click", () => {
    modal.style.display = "block";
});

// Para cerrar la ventana modal al hacer clic fuera de ella
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Obtén una referencia al botón de "Guardar"
const btnGuardar = document.getElementById("btnGuardar");

// Obtén referencias a los campos del formulario
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtCorreo = document.getElementById("txtCorreo");
const txtComentario = document.getElementById("txtComentario");

// Agrega un evento input a cada campo del formulario
txtNombre.addEventListener("input", validarCampos);
txtApellido.addEventListener("input", validarCampos);
txtCorreo.addEventListener("input", validarCampos);
txtComentario.addEventListener("input", validarCampos);

// Función para validar los campos y habilitar/deshabilitar el botón de "Guardar"
function validarCampos() {
    // Verifica si todos los campos están llenos
    const todosLlenos = txtNombre.value && txtApellido.value && txtCorreo.value && txtComentario.value;

    // Habilita o deshabilita el botón de "Guardar" según la validación
    if (todosLlenos) {
        btnGuardar.disabled = false;
    } else {
        btnGuardar.disabled = true;
    }
}

// Agrega un evento click al botón de "Guardar" para mostrar la alerta si es necesario
btnGuardar.addEventListener("click", (event) => {
    if (btnGuardar.disabled) {
        event.preventDefault(); // Evita que se envíe el formulario
        alert("Por favor, complete todos los campos del formulario antes de guardar.");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const btnBorrar = document.querySelectorAll(".btn-borrar");

    btnBorrar.forEach((btn) => {
        btn.addEventListener("click", async (ev) => {
            if (confirm("¿Desea borrar el registro?")) {
                await onDelete(ev.target.dataset.id);
                // Actualiza la sección de comentarios
                const commentsContainer = document.getElementById("commentsContainer");
                const commentCards = commentsContainer.querySelectorAll(".comment__card");
                commentCards.forEach((card) => {
                    if (card.querySelector(".nickname").textContent === ev.target.dataset.id) {
                        card.remove(); // Elimina la tarjeta del comentario
                    }
                });

                // Muestra una notificación
                Toastify({
                    text: "Registro eliminado correctamente!",
                    close: true,
                    duration: 3000
                }).showToast();
            }
        });
    });
});
