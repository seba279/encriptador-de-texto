

let btnEncriptador = document.getElementById('btnEncriptador');
let btnDesencriptar = document.getElementById('btnDesencriptar');
let texto = document.getElementById('textoAEncriptar');


texto.addEventListener("keypress",validar);
btnEncriptador.addEventListener("click",encriptarTexto);
btnDesencriptar.addEventListener("click",desencriptarTexto);
document.addEventListener("DOMContentLoaded", cargarDatos);



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function cargarDatos() {
    asignarTextoElemento('h1','Encriptador de texto');
    btnEncriptador.disabled = "true";
}


//Funcion para encriptar la frase ingresada en el input
function encriptarTexto() {
    let texto = document.getElementById('textoAEncriptar').value;
    //console.log(texto); 

    let frases = texto.split(' ');
    let fraseEncriptada = [];

    if(texto == ""){
        mostrarMnesaje();
    }else {
        frases.forEach(frase => {
            frase = frase.replaceAll('e','enter');
            frase = frase.replaceAll('i','imes');
            frase = frase.replaceAll('a','ai');
            frase = frase.replaceAll('o','ober');
            frase = frase.replaceAll('u','ufat');      
            
            fraseEncriptada.push(frase);   
        });
      
        const resultado = fraseEncriptada.join(' ');
        console.log(resultado);
        //document.getElementById('encriptado').value = resultado; 
        //activandoBotones();
        document.getElementById("btnDesencriptar").removeAttribute('disabled');
        document.getElementById("btnEncriptador").setAttribute('disabled','true');
        document.getElementById('textoAEncriptar').value="";
        document.getElementById("encriptado").focus();
        document.getElementById('encriptado').removeAttribute("hidden");
        //document.getElementById("encriptado").disabled = true;
        document.getElementById('encriptado').value = resultado;
        btnDesencriptar.setAttribute('style','color: rgb(242, 140, 140)');
        btnEncriptador.setAttribute('style','color: gray')
      
    }
}


//Funcion para desencriptar la frase ingresada en el input
function desencriptarTexto(e) {
    e.preventDefault();  
    let texto = document.getElementById('encriptado').value;
    //console.log(texto); 

    let frases = texto.split(' ');
    let fraseEncriptada = [];

    frases.forEach(frase => {
        frase = frase.replaceAll('enter','e');
        frase = frase.replaceAll('imes','i');
        frase = frase.replaceAll('ai','a');
        frase = frase.replaceAll('ober','o');
        frase = frase.replaceAll('ufat','u');      
        
        fraseEncriptada.push(frase); 
    });

    const resultado = fraseEncriptada.join(' ');
    console.log(resultado);
    document.getElementById('encriptado').value = resultado;
    document.getElementById("btnDesencriptar").setAttribute('disabled','true');
    document.getElementById("btnEncriptador").setAttribute('disabled','true');
    document.getElementById('textoAEncriptar').value="";
    document.getElementById("textoAEncriptar").focus();
    btnDesencriptar.setAttribute("style","color: gray");
}

function mostrarMnesaje() {
    console.log("No se ingreso ningun valor");
}

function validar() {
    document.getElementById("btnEncriptador").removeAttribute('disabled');
    btnEncriptador.setAttribute('style','color: rgb(242, 140, 140)');
}

/*
function activandoBotones() {
   
    document.getElementById("btnDesencriptar").disabled = false;
    document.getElementById("btnEncriptador").disabled = true;
    document.getElementById('textoAEncriptar').value="";
    document.getElementById("encriptado").focus();
    document.getElementById('encriptado').removeAttribute("hidden");
}*/






