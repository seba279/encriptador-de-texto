let texto = document.getElementById('textAreaEncriptada');
let mensaje = document.getElementById('mensaje');
let btnEncriptar = document.getElementById('botonEncriptar');
let btnDesencriptar = document.getElementById('botonDesencriptar');
let listaFrases = document.getElementById('listaFrases');
let btnLimpiar = document.getElementById('botonLimpiar');

let header = document.querySelector('header');
let footer = document.querySelector('footer');
let parrafo = document.querySelector('p');
let titulo = document.querySelector('strong');

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

const encriptarVocales = texto => texto.replace(/[eiaou]/g, c => ({e: 'enter', i: 'imes', a: 'ai', o: 'ober', u: 'ufat'})[c]);

const encriptarTexto = () => encriptarVocales(texto.value);

const caracteresValidos = (frase) => {
    const regex = /^[a-z !]*$/;
    return regex.test(frase);
};

const tieneVocales = (palabra) => {
    const vocales = /[aeiou]/;
    return vocales.test(palabra);
}

const verificarVocales = palabras => palabras.split(' ').every(palabra => !tieneVocales(palabra));

const agregarFrase = () => {
    let frase = texto.value;
    
    //Validando para que ingrese una Frase o palabra
    if (!frase) return mostrarError("Ingrese una frase por favor...");
    
    //Validando caracteres permitidos
    if (!caracteresValidos(frase)) return mostrarError("Solo se permiten letras minusculas y sin acentos."), setTimeout(() => texto.value = "", 2000);
    
    //Validando para que no se repitan las frases
    if (frasesNoEncriptada.includes(frase)) return mostrarError("No se permiten frases repetidas."), setTimeout(() => texto.value = "", 2000);

    //Validando para que no pueda volver a encriptar la frase
    if (frases.includes(frase)) return mostrarError("La frase ingresada ya esta encriptada.");

    //Validando que las palabras o frase ingresada tenga vocales para realizar la encriptacion.
    if(verificarVocales(frase)) return mostrarError("La frase ingresada no tiene vocales, no se puede encriptar."), setTimeout(() => texto.value = "", 2000);

    //Encriptando la Frase
    const fraseEncriptada = encriptarTexto(frase);

    //Almacenando la frase en un array
    frases = [...frases, fraseEncriptada];
    frasesNoEncriptada = [...frasesNoEncriptada, frase];
    crearElementos();
    mostrarResultado('listaFrases', fraseEncriptada);
    limpiarPonerFocus();
    btnLimpiar.style.display = "flex";
}

btnEncriptar.addEventListener("click", agregarFrase);

/* Desencriptando una Frase */

const desencriptarVocales = texto => texto.replace(/enter|imes|ai|ober|ufat/g, m => ({enter: 'e', imes: 'i', ai: 'a', ober: 'o', ufat: 'u'})[m]);

const verMensaje = frase => {
    mensaje.style.display = 'flex';
    document.getElementById('mensaje').innerText = frase;
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

const validarEncriptado = () => {
    const texto = document.getElementById('textAreaEncriptada').value;
    const estaEncriptado = /enter|imes|ai|ober|ufat/.test(texto);
    return estaEncriptado ? verMensaje(desencriptarVocales(texto)) : mostrarError("La frase ingresada no está encriptada");
}

const desencriptarTexto = () => {
    let frase = texto.value;
    
    //Validando que se ingrese una frase o palabra al hacer click sobre el boton de desencriptar
    if(!frase) return mostrarError("Ingrese un frase por favor"); 

    //Validando que se ingresen carcateres permitidos
    if(!caracteresValidos(frase)) return mostrarError("Solo se permiten letras minusculas y sin acentos"), setTimeout(() => texto.value = "", 2000);

    //Verificamos si la frase o palabra ingresada esta o no encriptada
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

//Creando las animaciones para los diferentes elementos
const animaciones = () => {
    const elementos = [
        { selector: 'header', options: { opacity: 0, duration: 1, delay: 0.2, y: -100 } },
        { selector: 'footer', options: { opacity: 0, duration: 1, delay: 0.3, y: 100 } },
        { selector: 'footer p', options: { opacity: 0, duration: 1, delay: 0.8, y: 100 } },
        { selector: '.footer__redes', options: { opacity: 0, duration: 1, delay: 0.8, y: 100 } },
        { selector: '.contenido__encriptador__elementos__texto', options: { opacity: 0, duration: 1, delay: 0.6, x: -100 } },
        { selector: '.contenido__encriptador_titulo', options: { opacity: 0, duration: 1, delay: 0.7, y: 100 } },
        { selector: '.contenido__botones', options: { opacity: 0, duration: 1, delay: 0.6, x: -100 } },
        { selector: '.listaFrases', options: { opacity: 0, duration: 1, delay: 0.6, x: 100 } },
        { selector: '.color__list', options: { opacity: 0, duration: 1, delay: 1, x: 100 } }
    ];

    elementos.forEach(elemento => {
        gsap.from(elemento.selector, elemento.options);
    });
};


// Cambiando los estilos
const aplicandoEstilos = (selector, styles) => {
    document.querySelectorAll(selector).forEach(elemento => {
        Object.assign(elemento.style, styles);
    });
};
 
document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', () => {
        const getColor = attr => button.getAttribute(attr);
        
        aplicandoEstilos('header', { backgroundColor: getColor('data-header-color') });
        aplicandoEstilos('.contenido__botones button', {
            backgroundColor: getColor('data-btn-color'),
            color: 'white'
        });

        document.querySelectorAll('.contenido__botones button').forEach(btn => {
            btn.addEventListener('mouseover', () => aplicandoEstilos(btn, { backgroundColor: '#fff', color: '#a9a9a9b7' }));
            btn.addEventListener('mouseout', () => aplicandoEstilos(btn, { backgroundColor: getColor('data-btn-color'), color: 'white' }));
        });

        titulo.style.color = getColor('data-titulo-color');
        aplicandoEstilos('footer', { backgroundColor: getColor('data-footer-color') });
        aplicandoEstilos('p', { color: getColor('data-parrafo-color') });
        aplicandoEstilos('.footer__redes_general', { color: getColor('data-redes-color') });

        // Animaciones
        animaciones();
    });
});
