let texto = document.getElementById('textAreaEncriptada');
let mensaje = document.getElementById('mensaje');
let btnEncriptar = document.getElementById('botonEncriptar');
let btnDesencriptar = document.getElementById('botonDesencriptar');
let listaFrases = document.getElementById('listaFrases');
let btnLimpiar = document.getElementById('botonLimpiar');

//Creando Arreglos
let frases = [];
let frasesNoEncriptada = [];

/* EVENTOS */
//Carga configuraciones iniciales
document.addEventListener("DOMContentLoaded", configuracionInicial());

//Agrega un frase
btnEncriptar.addEventListener("click", agregarFrase);

//Desencripta una frase
btnDesencriptar.addEventListener('click', desencriptarTexto);

//Limpia el textarea y el arreglo
btnLimpiar.addEventListener('click', limpiar);

/* FUNCIONES */
function configuracionInicial() {
    //Posiciona el cursor en el textarea
    texto.focus();
    feather.replace();
    //texto.removeAttribute("disabled");
}

//Mensaje de Error
function mostrarError(error) {
    mensaje.style.display = "flex";
    mensaje.textContent = error;
    setTimeout(() => { 
        mensaje.style.display = "none";
        texto.focus();
    }, 2000);
    texto.value = "";
}

//Reemplaza las vocales
function encriptarVocales(texto){
    const frase = {
        e: 'enter',
        i: 'imes',
        a: 'ai',
        o: 'obu',
        u: 'ufat'
    };
    return texto.replace(/e|i|a|o|u/g, vocal => frase[vocal]);
}

//Funcion para encriptar la frase ingresada
function encriptarTexto() {
    let frase = texto.value;
    return encriptarVocales(frase);
}

//Creando los elementos de una nueva frase
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
                navigator.clipboard.writeText(fraseEncriptada);
                texto.value="";
                mostrarError("La frase se pudo copiar correctamente");
                //mensaje.style.backgroundColor = "#33211c";
                texto.value = fraseEncriptada;
                //texto.setAttribute("disabled", "true");
                texto.focus();
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
    //texto.removeAttribute("disabled");

    if(frase === ""){
        mostrarError("Ingrese una frase por favor...");
        return;
    }

    //Validacion de letras minusculas y sin carcateres especiales
    const regex = /^[a-z ]*$/;

    if (!regex.test(frase)) {
        mostrarError("Solo se permiten letras minusculas y sin acentos");
        return;
    }

    if(frasesNoEncriptada.includes(frase)) {
        mostrarError("No se permiten frases repetidas");
        return;
    }

    if(frases.includes(frase)) {
        mostrarError("La frase ingresada ya esta encriptada");
        return;
    }else {
        const fraseEncriptada = encriptarTexto(frase);
        frases = [...frases,fraseEncriptada];
        frasesNoEncriptada = [...frasesNoEncriptada, frase];
        texto.value = "";
        texto.focus();
        crearElementos();
        mostrarResultado('listaFrases', fraseEncriptada);
        btnLimpiar.style.display = "flex";
    }
}

function desencriptarVocales(texto){
    const fraseEncriptada = {
        enter: 'e',
        imes: 'i',
        ai: 'a',
        obu: 'o',
        ufat: 'u'
    };
    return texto.replace(/enter|imes|ai|obu|ufat/g, grupoPalabras => fraseEncriptada[grupoPalabras]);
}

//Verificando si la frase ingresada esta encriptada o no
function validarEncriptado() {
    let texto = document.getElementById('textAreaEncriptada').value;
    let patronEncriptado = /enter|emi|ai|obu|ufat/;
    //Verificamos si la frase esta encriptada
    let estaEncriptado = patronEncriptado.test(texto);
    if(!estaEncriptado){
        mostrarError("La frase ingresada no esta encriptada");
    }else {
        const textoDesencriptado = desencriptarVocales(texto); 
        mensaje.style.display = 'flex';
        document.getElementById('mensaje').innerText = textoDesencriptado;
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 3000);
    }
}

//Funcion para desencriptar la frase ingresada 
function desencriptarTexto() {  
    const fraseEncriptada = texto.value;
    if(fraseEncriptada === ""){
        mostrarError("Ingrese un frase por favor");
    }else {
        validarEncriptado();
        texto.value= "";
        setTimeout(() => {
            //texto.removeAttribute("disabled");
            texto.focus(); 
        }, 3000);
    }
    return;    
}

//Funcion que limpia el textarea y el arreglo
function limpiar() {
    texto.value = "";
    texto.focus();
    frases = [];
    frasesNoEncriptada = []
    listaFrases.innerHTML = "";
    btnLimpiar.style.display = "none"; 
}







