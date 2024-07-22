let texto = document.getElementById('textAreaEncriptada');
let mensaje = document.getElementById('mensaje');
let btnEncriptar = document.getElementById('botonEncriptar');
let btnDesencriptar = document.getElementById('botonDesencriptar');
let listaFrases = document.getElementById('listaFrases');
let btnLimpiar = document.getElementById('botonLimpiar');

//Creando Arreglos
let frases = [];
let frasesNoEncriptada = [];

/* Cargando configuraciones Iniciales */

const configuracionInicial = () => {
    texto.focus();
    feather.replace();
    texto.removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", configuracionInicial);

/* Encriptando una Frase */

const limpiarPonerFocus = () => {
    setTimeout(() => {
        texto.value= ""; texto.focus();
    }, 2000);
}

const mostrarResultado = (elemento, frase) => document.getElementsByClassName(elemento).innerHTML = frase;

const mostrarError = error => {
    mensaje.style.display = "flex";
     mensaje.textContent = error;
    setTimeout(() => { 
        mensaje.style.display = "none";
        texto.focus();
    }, 2000);
}

const crearDivConFrase = (frase) => {
    const div = document.createElement('div');
    div.classList.add('listaFrases');
    div.innerHTML = frase;
    return div;
}

const crearIcono = () => {
    const icono = document.createElement('i');
    icono.setAttribute("data-feather", "copy");
    icono.className = "listaFrases__icono_copiar";
    return icono;
}

const actualizarBoton = (boton) => {
    boton.style = "border-radius: 10px; width: 80px; color: #cccccc";
    boton.innerText = "Copiado";

    setTimeout(() => {
        boton.style = "border-radius: 50%; color: initial";
        boton.innerHTML = "";
        boton.appendChild(crearIcono());
        feather.replace();
    }, 2000);
}

const crearBotonCopiar = (frase) => {
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

//Creando los elementos de una nueva frase
const crearElementos = () => {
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

const encriptarVocales = texto => texto.replace(/[eioua]/g, c => ({e: 'enter', i: 'imes', a: 'ai', o: 'obu', u: 'ufat'})[c]);

const encriptarTexto = () => encriptarVocales(texto.value);

const caracteresValidos = (frase) => {
    const regex = /^[a-z ]*$/;
    return regex.test(frase);
};

const agregarFrase = () => {
    let frase = texto.value;

    if (!frase) return mostrarError("Ingrese una frase por favor...");

    //if (caracteresEspeciales(frase)) return mostrarError("La frase contiene caracteres especiales no permitidos."), setTimeout(() => texto.value = "", 2000);

    if (!caracteresValidos(frase)) return mostrarError("Solo se permiten letras minusculas y sin acentos."), setTimeout(() => texto.value = "", 2000);

    if (frasesNoEncriptada.includes(frase)) return mostrarError("No se permiten frases repetidas."), setTimeout(() => texto.value = "", 2000);

    if (frases.includes(frase)) return mostrarError("La frase ingresada ya esta encriptada.");

    const fraseEncriptada = encriptarTexto(frase);
    frases = [...frases, fraseEncriptada];
    frasesNoEncriptada = [...frasesNoEncriptada, frase];
    crearElementos();
    mostrarResultado('listaFrases', fraseEncriptada);
    limpiarPonerFocus();
    btnLimpiar.style.display = "flex";
}

btnEncriptar.addEventListener("click", agregarFrase);

/* Desencriptando una Frase */

const desencriptarVocales = texto => texto.replace(/enter|imes|ai|obu|ufat/g, m => ({enter: 'e', imes: 'i', ai: 'a', obu: 'o', ufat: 'u'})[m]);

const verMensaje = frase => {
    mensaje.style.display = 'flex';
    document.getElementById('mensaje').innerText = frase;
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

const validarEncriptado = () => {
    const texto = document.getElementById('textAreaEncriptada').value;
    const estaEncriptado = /enter|emi|ai|obu|ufat/.test(texto);
    return estaEncriptado ? verMensaje(desencriptarVocales(texto)) : mostrarError("La frase ingresada no está encriptada");
}

const desencriptarTexto = () => {
    let frase = texto.value;
    if(!frase) return mostrarError("Ingrese un frase por favor"); 
    if(!caracteresValidos(frase)) return mostrarError("Solo se permiten letras minusculas y sin acentos"), setTimeout(() => texto.value = "", 2000);
    validarEncriptado();
    limpiarPonerFocus();
    texto.removeAttribute("disabled");
}

btnDesencriptar.addEventListener('click', desencriptarTexto);

/* Limpiando el Textarea y los Arreglos */

const limpiar = () => {
    //Eliminando los elementos de los Arreglos
    frases = [];
    frasesNoEncriptada = []
    //Limpiando los elementos
    listaFrases.innerHTML = "";
    //Desabilita el boton de Limpiar
    btnLimpiar.style.display = "none"; 
    texto.removeAttribute("disabled");
    texto.focus(); 
    texto.value = "";
}

btnLimpiar.addEventListener('click', limpiar);
