/*
    JS Objetos
    25/07/2023
*/
"use strict"

/*saludar = "Hola";*/

/* 2. CREAR OBJETO EN BASE A OBJECT() */
//var marca = "Prueba";

var auto = new Object();
    auto.marca = "Toyota";
    auto.modelo = "RAV4";
    auto.estilo = "4x4";
    auto.infoGeneral = ()=> `${auto.marca} | ${auto.modelo} | ${auto.estilo}`;
    

/* 3. Crear objetos en base a una funcion constructora */
function Persona(nombre, apellido, direccion) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
}

Persona.prototype.nombreCompleto = function(){
    return `${this.nombre} ${this.apellido}`;
}

var miPersona =  new Persona("Pedro", "Perez", "PZ")

/* 4. CREAR OBJETOS EN BASE CLASE */
 
class Persona2{
    constructor(nombre, apellido, direccion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
    }

    nombreCompleto(){
        return `${this.nombre} ${this.apellido}`;
    }
}

var otraPersona = new Persona2("Ana", "Perez", "San José");

console.log(otraPersona.nombreCompleto());

/****** DOM ******/

/*
    1. document.getElementById() --> OBJETO
    2. document.getElementsByTagName() --> HTMLCollection
    3. document.getElementsByClass() --> HTMLCollection
*/

/* document.getElementsByTagName() */

var p = document.getElementsByTagName("p");
p[0].innerHTML = "HOLA MUNDO DESDE JS!!!!"
console.log(p[0].innerHTML);
console.log(p);

for (let index = 0; index < p.length; index++) {
    p[index].style.border = "1px solid red";
    p[index].style.padding = "10px";
    p[index].style.color = "#FFF";

    if (index % 2 === 0){
        p[index].classList.add("rojo")
    }else{
        p[index].classList.add("morado")
    }
}

/*  document.getElementsByClass */
var marcar = document.getElementsByClassName("marcar");
for (let index = 0; index < marcar.length; index++) {
    marcar[index].innerHTML = "<b>MARCADO</b>";
}

/* document.getElementById() */
document.getElementById("demo").innerHTML = p[p.length - 2].innerText;

/*************************/
var dato1 = document.getElementById("txtDato1").value;
var dato2 = document.getElementById("txtDato2").value;

function saludar() {
    alert(`Hola ${dato1} ${dato2}`);
}

function agregar() {
    let texto = document.getElementById("txtTexto1").value;
    document.getElementById("lista").innerHTML += `<li>${texto}</li>`;
}
console.log(dato1, dato2);
