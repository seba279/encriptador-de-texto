/*
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
        //console.log(resultado);
        document.getElementById('encriptado').value = resultado;
        //document.getElementById('encriptado').value = resultado; 
        accionesEncriptar();
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
    //console.log(resultado);
    document.getElementById('encriptado').value = resultado;
    accionesDesencriptar();
    
}

function mostrarMnesaje() {
    console.log("No se ingreso ningun valor");
}

function validar() {
    document.getElementById("btnEncriptador").removeAttribute('disabled');
    btnEncriptador.setAttribute('style','color: rgb(242, 140, 140)');
}


function accionesEncriptar() {

    document.getElementById("btnDesencriptar").removeAttribute('disabled');
    document.getElementById("btnEncriptador").setAttribute('disabled','true');
    document.getElementById('textoAEncriptar').value="";
    document.getElementById("encriptado").focus();
    document.getElementById('encriptado').removeAttribute("hidden");
    //document.getElementById("encriptado").disabled = true;
    btnDesencriptar.setAttribute('style','color: rgb(242, 140, 140)');
    btnEncriptador.setAttribute('style','color: gray')
}

function accionesDesencriptar() {
    
    document.getElementById("btnDesencriptar").setAttribute('disabled','true');
    document.getElementById("btnEncriptador").setAttribute('disabled','true');
    document.getElementById('textoAEncriptar').value="";
    document.getElementById("textoAEncriptar").focus();
    btnDesencriptar.setAttribute("style","color: gray");
}

*/

let mensaje = document.getElementById('mensaje');
let btnEncriptar = document.getElementById('botonEncriptar');
let textArea = document.getElementById('textAreaEncriptada')
let btnDesencriptar = document.getElementById('botonDesencriptar');

btnEncriptar.addEventListener("click", validarEntrada);
btnDesencriptar.addEventListener("click", desencriptarTexto)



function validarEntrada() {
    let frase = document.getElementById('textAreaEncriptada').value;

    const regex = /^[a-z ]*$/;

    if (!regex.test(frase)) {

        mensaje.style.display = 'flex';
        mensaje.textContent = "Solo se permiten letras minusculas y sin acentos";
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 2000)

        document.getElementById('textAreaEncriptada').value = "";
        document.getElementById('textAreaEncriptada').focus();

    }else if(frase == ""){
        mensaje.style.display = 'flex';
        mensaje.textContent = "Ingrese una frase por favor";
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 2000)

        document.getElementById('textAreaEncriptada').focus();
    }else {
        const resultado = encriptarTexto();
        //console.log(resultado);
       
        mensaje.style.display = 'flex';
        document.getElementById('mensaje').innerText = resultado;
        document.getElementById('textAreaEncriptada').value = "";
        document.getElementById('textAreaEncriptada').focus();
    }

}

//Funcion para encriptar la frase ingresada
function encriptarTexto() {
    let texto = document.getElementById('textAreaEncriptada').value;
    //console.log(texto); 

    let frases = texto.split(' ');
    let fraseEncriptada = [];

    frases.forEach(frase => {
        frase = frase.replaceAll('e','enter');
        frase = frase.replaceAll('i','imes');
        frase = frase.replaceAll('a','ai');
        frase = frase.replaceAll('o','ober');
        frase = frase.replaceAll('u','ufat');      
        
        fraseEncriptada.push(frase);   
    });
    
    const resultado = fraseEncriptada.join(' ');
    
    return resultado;
}


//Funcion para desencriptar la frase ingresada en el input
function desencriptarTexto() {  
    let texto = document.getElementById('textAreaEncriptada').value;
    console.log(texto); 

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
    mensaje.style.display = 'flex';
    document.getElementById('mensaje').innerText = resultado;
    document.getElementById('textAreaEncriptada').value = "";
    document.getElementById('textAreaEncriptada').focus();
    
}





