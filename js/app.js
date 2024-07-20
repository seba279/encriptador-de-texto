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
    texto.removeAttribute("disabled");
}

//Mensaje de Error
function mostrarError(error) {
    mensaje.style.display = "flex";
    mensaje.textContent = error;
    setTimeout(() => { 
        mensaje.style.display = "none";
        texto.focus();
    }, 2000);
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
    listaFrases.innerHTML = "";

    if (frases.length > 0) {
        frases.forEach((frase) => {
            const div = crearDivConFrase(frase);
            const boton = crearBotonCopiar(frase);
            div.appendChild(boton);
            listaFrases.appendChild(div);
        });
    }
    feather.replace();
}

function crearDivConFrase(frase) {
    const div = document.createElement('div');
    div.classList.add('listaFrases');
    div.innerHTML = frase;
    return div;
}

function crearBotonCopiar(frase) {
    const boton = document.createElement('button');
    boton.className = 'contenido__encriptador__boton_copiar';
    boton.appendChild(crearIcono());

    boton.addEventListener("click", () => {
        navigator.clipboard.writeText(frase);
        actualizarBoton(boton);
        texto.setAttribute("disabled", "true");
        texto.value = frase;
    });

    return boton;
}

function crearIcono() {
    const icono = document.createElement('i');
    icono.setAttribute("data-feather", "copy");
    icono.className = "listaFrases__icono_copiar";
    return icono;
}

function actualizarBoton(boton) {
    
    boton.style = "border-radius: 10px; width: 80px; color: #cccccc";
    boton.innerText = "Copiado";

    setTimeout(() => {
        boton.style = "border-radius: 50%; color: initial";
        boton.innerHTML = "";
        boton.appendChild(crearIcono());
        feather.replace();
    }, 2000);
}

function mostrarResultado(elemento, frase){
    let elementoHTML = document.getElementsByClassName(elemento);
    elementoHTML.innerHTML = frase;
    return;
}

function limpiarPonerFocus(){
    setTimeout(() => {
        texto.value= "";
        texto.focus(); 
    }, 2000);
    
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
        setTimeout(() => {
            texto.value= "";  
        }, 2000);
        return;
    }

    if(frasesNoEncriptada.includes(frase)) {
        mostrarError("No se permiten frases repetidas");
        setTimeout(() => {
            texto.value= "";  
        }, 2000);
        return;
    }

    if(frases.includes(frase)) {
        mostrarError("La frase ingresada ya esta encriptada");
        return;
    }else {
        const fraseEncriptada = encriptarTexto(frase);
        frases = [...frases,fraseEncriptada];
        frasesNoEncriptada = [...frasesNoEncriptada, frase];
        crearElementos();
        mostrarResultado('listaFrases', fraseEncriptada);
        limpiarPonerFocus();
        //Habilita el boton de Limpiar
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

function verMensaje(frase) {
    mensaje.style.display = 'flex';
        document.getElementById('mensaje').innerText = frase;
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 3000);
}

//Verificando si la frase ingresada esta encriptada o no
function validarEncriptado() {
    let texto = document.getElementById('textAreaEncriptada').value;
    //console.log(texto);
    let patronEncriptado = /enter|emi|ai|obu|ufat/;
    //Verificamos si la frase esta encriptada
    let estaEncriptado = patronEncriptado.test(texto);
    //console.log(estaEncriptado);
    if(!estaEncriptado){
        mostrarError("La frase ingresada no esta encriptada");
    }else {
        const textoDesencriptado = desencriptarVocales(texto); 
        return verMensaje(textoDesencriptado);
    }
}

//Funcion para desencriptar la frase ingresada 
function desencriptarTexto() {  
    const fraseEncriptada = texto.value;

    if(fraseEncriptada === ""){
        mostrarError("Ingrese un frase por favor");
    }else {
        validarEncriptado();
        limpiarPonerFocus();
        texto.removeAttribute("disabled");
    }
    return;    
}

//Funcion que limpia el textarea y el arreglo
function limpiar() {
    
    //Eliminando los elementos de los Arreglos
    frases = [];
    frasesNoEncriptada = []
    //Limpiando los elementos
    listaFrases.innerHTML = "";
    //Desabilita el boton de Limpiar
    btnLimpiar.style.display = "none"; 
    //Habilitando el texarea
    texto.removeAttribute("disabled");
    texto.focus(); 
    texto.value = "";
}
