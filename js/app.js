let texto = document.getElementById('textAreaEncriptada');
let mensaje = document.getElementById('mensaje');
let btnEncriptar = document.getElementById('botonEncriptar');
let btnDesencriptar = document.getElementById('botonDesencriptar');
let listaFrases = document.getElementById('listaFrases');

let frases = [];


//EVENTO
eventListener();

//FUNCIONES

function eventListener() {
    texto.focus();
    btnEncriptar.addEventListener("click", agregarFrase);
    //btnDesencriptar.addEventListener("click", desencriptarTexto);
}

function agregarFrase() {

    //let frases = [];
    console.log(frases);
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
        frases = [...frases,fraseEncriptada];
        //console.log(frases);
        texto.value = "";
        texto.focus();
        crearElementos();
    }
    
}

function mostrarError(error) {
    const mensajeError = document.createElement('div');
    mensajeError.textContent = error;
    mensajeError.classList.add('contenedor');

    const contenedor = document.querySelector('#contenedor1');
    contenedor.appendChild(mensajeError);
    setTimeout(() => { 
        mensajeError.remove();
        texto.focus();
    }, 2000);
    texto.value = "";
   
}

function crearElementos() {

    listaFrases.innerHTML="";

    if(frases.length > 0){
        frases.forEach((frase) => {
            const div = document.createElement('div');
            div.classList.add('listaFrases');
            div.innerHTML = frase;
             // Crear un checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'styled-checkbox';
            verificarCheckbox(checkbox);
            
            div.appendChild(checkbox);

            listaFrases.appendChild(div);
        })
    }
}

function verificarCheckbox(checkbox) {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {

            //Deshabilitar todos los demás checkboxes
            const allCheckboxes = document.querySelectorAll('.styled-checkbox');
            allCheckboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.disabled = true;
                }
                setTimeout(() => {
                    cb.checked = false;
                    cb.disabled = false;
                }, 3000);
                
            });

            const textoEncriptado = div.innerText;
            //console.log(textoEncriptado);
            
            desencriptarTexto(textoEncriptado);
            
            setTimeout(() => {
                texto.focus();
            }, 3000);
            
           
            //const resultado = desencriptarTexto(textoEncriptado);
            //console.log(resultado);

            //btnDesencriptar.style.display = 'block';
            //btnEncriptar.style.backgroundColor = "red";
            //btnEncriptar.style.border ="none";
            //btnEncriptar.setAttribute("disabled", "true");
            //btnEncriptar.style.color = "white";
            //texto.disabled = "true";
            //texto.focus();
            
        } else {
            // Habilitar todos los checkboxes si se desmarca
            const allCheckboxes = document.querySelectorAll('.styled-checkbox');
            
            allCheckboxes.forEach(cb => {
                    cb.disabled = false;
            });
            btnDesencriptar.style.display = 'none';
            texto.removeAttribute('disabled');
            
            //btnEncriptar.style.backgroundColor = "black";
            //btnEncriptar.removeAttribute("disabled");
            //const textoEncriptado = div.innerText;
            //console.log(textoEncriptado);

        }
    });
}

//Funcion para encriptar la frase ingresada
function encriptarTexto() {

    let frases = texto.value.split(' ');
    let fraseEncriptada = [];

    frases.forEach(frase => {
        frase = frase.replaceAll('e','enter');
        frase = frase.replaceAll('i','imes');
        frase = frase.replaceAll('a','ai');
        frase = frase.replaceAll('o','ober');
        frase = frase.replaceAll('u','ufat');      
        
        fraseEncriptada.push(frase);   
    });
    
    let resultado = fraseEncriptada.join(' ');
    return resultado;
}

//Funcion para desencriptar la frase ingresada en el input
function desencriptarTexto(textoEncriptado) {  

    const textoDesencriptado = textoEncriptado.replaceAll('enter','e')
                                        .replaceAll('imes','i')
                                        .replaceAll('ai','a')
                                        .replaceAll('ober','o')
                                        .replaceAll('ufat','u');  
    mensaje.style.display = 'flex';
    document.getElementById('mensaje').innerText = textoDesencriptado;
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
    return;    
}







