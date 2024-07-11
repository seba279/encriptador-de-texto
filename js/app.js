let texto = document.getElementById('textAreaEncriptada');
let mensaje = document.getElementById('mensaje');
let btnEncriptar = document.getElementById('botonEncriptar');
let btnDesencriptar = document.getElementById('botonDesencriptar');
let listaFrases = document.getElementById('listaFrases');

//Creando un Arreglo
let frases = [];

//EVENTOS

//Carga configuraciones iniciales
document.addEventListener("DOMContentLoaded", configuracionInicial());

//Permite agregar una frase a un arreglo.
btnEncriptar.addEventListener("click", agregarFrase);

//Permite desencriptar la frase al hacer click sobre el boton.
btnDesencriptar.addEventListener('click', desencriptarTexto);

//FUNCIONES

function configuracionInicial() {
    texto.focus();
    feather.replace();
}

function mostrarError(error) {
    mensaje.style.display = "flex";
    mensaje.textContent = error;
    setTimeout(() => { 
        mensaje.style.display = "none";
        texto.focus();
    }, 2000);
    texto.value = "";
}

function encriptarVocales(texto){
    return texto.replaceAll('a', 'ai')
                .replaceAll('e', 'enter')
                .replaceAll('i', 'imes')
                .replaceAll('o', 'ober')
                .replaceAll('u', 'ufat');
}

//Funcion para encriptar la frase ingresada
function encriptarTexto() {
    let frase = texto.value;
    return encriptarVocales(frase);
}

function crearElementos() {

    listaFrases.innerHTML="";

    if(frases.length > 0){

        frases.forEach((frase) => {

            //Creando un div
            const div = document.createElement('div');
            div.classList.add('listaFrases');
            div.innerHTML = frase;

            //Creando el boton
            const boton = document.createElement('button');

            //Creando una clase para el boton
            boton.className = 'contenido__encriptador__boton_copiar';

            //Evento click del boton que nos permite copiar el texto
            boton.addEventListener("click", () => {
                const fraseEncriptada = frase;
                //console.log(fraseEncriptada);
                navigator.clipboard.writeText(fraseEncriptada);
                texto.value="";
            });

            //Creando el icono
            const icono = document.createElement('i');

            //Asignandole un icono al boton(feather)
            icono.setAttribute("data-feather", "copy");

            //Creando una clase para el icono
            icono.className = "listaFrases__icono_copiar";

            boton.appendChild(icono);

            div.appendChild(boton);

            listaFrases.appendChild(div);
            /* Iconos Feather */
            feather.replace();
        })
    }
}

function mostrarResultado(elemento, frase){
    let elementoHTML = document.getElementsByClassName(elemento);
    elementoHTML.innerHTML = frase;
    return;
}

function agregarFrase() {

    let frase = texto.value;
    
    if(frase === ""){
        mostrarError("Ingrese una frase por favor...");
        return;
    }

    const regex = /^[a-z ]*$/;

    if (!regex.test(frase)) {
        mostrarError("Solo se permiten letras minusculas y sin acentos");
        return;
    }

    if(frases.includes(frase)) {
        mostrarError("No se permiten frases repetidas");
        return;
    }else {
        const fraseEncriptada = encriptarTexto(frase);
        //console.log(fraseEncriptada);
        frases = [...frases,fraseEncriptada];
        //console.log(frases);
        texto.value = "";
        texto.focus();
        crearElementos();
        console.log(frases);
        mostrarResultado('listaFrases', fraseEncriptada)
    }
}

function desencriptarVocales(texto){
    return texto.replaceAll('enter','e')
                .replaceAll('imes','i')
                .replaceAll('ai','a')
                .replaceAll('ober','o')
                .replaceAll('ufat','u'); 
}

//Verificando si la frase ingresada esta encriptada o no
function validarEncriptado() {
    let texto = document.getElementById('textAreaEncriptada').value;
    //console.log(texto);
    let patronEncriptado = /ai|emi|iai|omi|umi/;
    let estaEncriptado = patronEncriptado.test(texto);
    //console.log(estaEncriptado);
    if(!estaEncriptado){
        mostrarError("El texto no esta encriptado");
    }else {
        const textoDesencriptado = desencriptarVocales(texto); 
        mensaje.style.display = 'flex';
        document.getElementById('mensaje').innerText = textoDesencriptado;
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 3000);
    }
}

//Funcion para desencriptar la frase ingresada en el input
function desencriptarTexto() {  
    const fraseEncriptada = texto.value;

    if(fraseEncriptada === ""){
        mostrarError("Ingrese un frase por favor");
    }else {
        validarEncriptado();
        texto.value= "";
        setTimeout(() => {
            texto.focus(); 
        }, 3000);
    }
    return;    
}







