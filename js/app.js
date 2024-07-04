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





