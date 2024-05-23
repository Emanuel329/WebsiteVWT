/*
    FUNCIONES EN JS
    18/07/2023
*/

/* 1. Funciones tradicionales */

function saludar() {
    return "Hola Mundo desde JS"
}

function multiplicar(param1, param2 = 5) {
    return param1 * param2   
}

/* 
    PARAMETRO = "variables" usa funcion - UTILIZA
    ARGUMENTO = Valor que toma el parametro cuando se ejecuta la funcion. 
*/

/* 2. Funciones anonimas */

var dividir = function (param1, param2){
    return param1 / param2
}


/* 3. FUNCIONES DE CALLBACK */

function saludo(nombre){
    console.log("Hola " + nombre);
}

function procesarSaludo(parametro) {
    let nombre = "Pedro";
    parametro(nombre);   
}
//saludo("Ana");
//procesarSaludo(saludo);

/* 4. FUNCIONES DE FECHA --> SUSTITUAR PALABRAS X SIMBOLOS */
/*
var sumar = function (p1, p2) {
    return p1 + p2;
}

var sumar = (p1, p2) => {
    return p1 + p2;
}
*/

var sumar = (p1, p2) => p1 + p2;

var sumar1 = p1 => p1 + 3;

//console.log(sumar1(10));

/****** ARREGLOS ******/
var miArreglo = [1,2,3,"Pedro", "Ana", {}, null, [], true];

var numeros = [55,13,78,26,34,10,3,61,8,13];
var frutas = ["Manzana", "Uva", "Sandia"];

/* 1. COMO LEER EL ARREGLO? 

for (let index = 0; index < frutas.length; index++) {
    console.log(frutas[index]);
}

frutas.forEach(function(valor){
    console.log(valor);
});*/


/* 2. AGERGAR/ELIMINAR VALORES => PUSH, POP */
/*frutas.push("Banano", "Naranja", "Pera", "Mango");
frutas.pop();frutas.pop();frutas.pop();*/

/* 
    SPLICE => array.splice(indice, bandera, ?valores)
        indice = indice del arreglo
        bandera = 0:No Elmina/Agrega, N: borra cantidad de elementos representados N
        ?valores = Depende de la bandera
*/

frutas.splice(2,0,"Banano", "Naranja", "Pera", "Mango");
//frutas.splice(4,3);

frutas.forEach((valor, indice) => console.log(valor, indice));

/* 3. DIFERENTES FUNCIONES DE LOS ARREGLOS => CLONAR EL ARREGLO */

console.log(frutas.reverse());

console.log(frutas.sort());

console.log(frutas.sort().reverse());

console.log(numeros.sort((a, b) => a - b));

console.log(numeros.filter(numero => numero > 11));

console.log(frutas.filter(fruta => fruta.length > 4));

console.log(frutas.find(valor => valor == "Pera"));

console.log(frutas.findIndex(valor => valor == "Pera"));

console.log(frutas.join("-"));

console.log(frutas.toString());

console.log(frutas.map(valor => `<div>${valor}</div>`));

console.log(numeros.map(numero => numero * 100));

console.log(frutas.values());

const iterador = frutas.values();

for (const valor of iterador) {
    console.log(valor);
}

console.log(miArreglo);

/*
    1. Escribe una función que encuentre el número mayor en un arreglo de números.

    2. Escribe una función que reciba un arreglo de números y devuelva la suma de todos sus elementos.
*/

function numeroMayor(arreglo){
    let ordenado = arreglo.sort((a, b) => a - b).reverse();
    return ordenado[0];
}

function sumaElementos(arreglo){
    let suma = 0;
    arreglo.forEach(valor => suma += valor);
    return suma;
}

const numeros2 = [1,2,3,4,5];
console.log(numeroMayor(numeros2));
console.log(sumaElementos(numeros2));

/****** OBJETOS --> POO ******/

/* 1. CREAR OBJETOS EN BASE A LLAVE {} --> ATRIBUTO:VALOR */
var miObj = {
    nombre: "Pedro",
    apellido: "Perez",
    direccion: "PZ"
}

var persona = {
    nombre: "Warner",
    apellido: "Carrillo Ramírez",
    direccion: "San José",
    
    saludar: function(){
        //return "Hola " + this.nombre + " " + this.apellido
        return `Hola ${this.nombre} ${this.apellido} desde JS` //TEMPLATE STRING
    },

    nombreCompleto: function(){
        return `${this.nombre} ${this.apellido}`
    }
}

console.log(persona.nombreCompleto());