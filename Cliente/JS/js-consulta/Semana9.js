/*
    FUNDAMENTOS DE JS
    11/07/2023
*/

/* 1. VARIABLES --> VAR* | LET */
var miVariable = "Hola Mundo desde JS";

/* 2. CONSTANTE --> CONST */
const PI_NUMERO = 3.14

/* 3. TIPOS DATOS */
var miNombre = "Warner";
var miEdad = 40;
var esAlto = true;
var otraVariable;
var otraNula = null;
var miObjeto = {};
var miArreglo = [];


console.log(typeof miNombre,
            typeof miEdad,
            typeof esAlto,
            typeof otraVariable,
            typeof otraNula,
            typeof miObjeto,
            typeof miArreglo);

/* 4. OPERADORES ARITMETICOS +,-,*,/,%,++,--,- */
var numero1 = 15;
var numero2 = 5;

console.log(numero1++); //16
console.log(++numero2); //5
console.log(numero1);

/* 5. OPERADORES DE ASIGACION & EVALUACION =, ==, >, < ,>=, <=, != */

numero1 = 15;
numero2 = "15";

console.log(numero1 === numero2)

/* 6.SENTENCIAS IF IF/ELSE SWITCH LOOPS(FOR WHILE DO/WHILE)  */
var respuesta;

if (numero1 === numero2){
    respuesta = true
}else{
    respuesta = false
}

console.log(respuesta);

var numero3 = 2

switch (numero3) {
    case 1:
        respuesta = "Sí"
        break;
    
    case 2:
        respuesta = "No"
        break;

    default:
        respuesta = "N/A"
        break;
}
console.log(respuesta);

/* FOR */
for (let index = 0; index < 5; index++) {
    console.log(index)   
}

/* WHILE */
var y = 0;
while (y < 5) {
    console.log("y= " + y);
    y++;
}

/* DO WHILE */
var x = 0
do {
    console.log("X = " + x);
    x++;
} while (x < 5);


/*
    - SUMAR TODOS LOS NUMEROS PARES ENTRE N y M, M>N.
    - 
*/

var n1 = 1;
var n2 = 10;
var sumar = 0;

if (n2 > n1){
    for (let index = n1; index <= n2; index++) {
        if (index % 2 === 0){
            console.log(index);
            sumar += index
        }
    }
}

console.log(sumar);

/* 7. FUNCIONES */

function saludar (param1) {
    console.log("Hola " + param1);
}

saludar("Eduardo");

saludar("Maria");

saludar("José");

var sumar = function(p1, p2 = 3){
    return p1 + p2;
}

console.log(sumar(10, 12));

/* FUNCIONES CALLBACK --> FUNCION QUE RECIVE COMO PARAMETRO A OTRA FUNCION */

function procesarSaludo(otraFuncion) {
    let nombre = "Sara" 
    otraFuncion(nombre)
}

procesarSaludo(saludar);

/* FUNCION FLECHA O ARROW FUNCTION => */
/*
function restar (p1, p2) {
    return p1 - p2   
}


var restar = function (p1, p2) {
    return p1 - p2   
}

var restar =(p1, p2) => {
    return p1 - p2   
}
*/


var restar =(p1, p2) => p1 - p2;  




console.log(restar(10,5));