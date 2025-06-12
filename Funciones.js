//declarar variables
var numero1;
var operacion;
//var de botones
function inicio(){
    var resultado = document.getElementById('resultado');
    var reinicio = document.getElementById('reinicio');
    var Aceptar = document.getElementById('Aceptar')
    var uno = document.getElementById('uno')
    var dos = document.getElementById('dos')
    var tres = document.getElementById('tres')
    var cuatro = document.getElementById('cuatro')
    var cinco = document.getElementById('cinco')
    var seis = document.getElementById('seis')
    var siete = document.getElementById('siete')
    var ocho = document.getElementById('ocho')
    var nueve = document.getElementById('nueve')
    var cero = document.getElementById('cero')
}

//al presionar botones
uno.onclick = function(e) {
    resultado.textContent += "1";
};
dos.onclick = function(e) {
    resultado.textContent +=  "2";
};
tres.onclick = function(e) {
    resultado.textContent +=  "3";
};
cuatro.onclick = function(e) {
    resultado.textContent += "4";
};
cinco.onclick = function(e) {
    resultado.textContent +=  "5";
};
seis.onclick = function(e) {
    resultado.textContent +=  "6";
};
siete.onclick = function(e) {
    resultado.textContent +=  "7";
};
ocho.onclick = function(e) {
    resultado.textContent +=  "8";
};
nueve.onclick = function(e) {
    resultado.textContent +=  "9";
};
cero.onclick = function(e) {
    resultado.textContent +=  "0";
};


reinicio.onclick = function(e){
    quitar();
}
function quitar(){
    resultado.textContent = "";
    operacion = 0;
    numero1 = 0; 
    document.getElementById('Grafica').style.display = 'none';
}

Aceptar.onclick = function(e){
    numero1 = parseFloat(resultado.textContent);
    resolver();
    
    var overlay = document.getElementById('cuadro');
    overlay.classList.add('expandiendo');   
    ajustarPosicionResultado();

    document.getElementById('Grafica').style.display = 'block';

    // Crear el botón de recarga
    var botonRecargar = document.createElement("button");
    botonRecargar.textContent = "Restart";
    botonRecargar.id = "recargar";
    botonRecargar.style.position = "absolut e";
    botonRecargar.style.top = "900px";
    botonRecargar.style.left = "25%";
    botonRecargar.style.transform = "translateX(-50%)";
    botonRecargar.style.fontSize = "20px";
    botonRecargar.style.padding = "10px";
    botonRecargar.style.borderRadius = "10px";
    botonRecargar.style.backgroundColor = "red";
    botonRecargar.style.color = "white";
    botonRecargar.style.cursor = "pointer";

    // Agregar funcionalidad de recarga
    botonRecargar.onclick = function() {
        location.reload();
    };

    // Agregar el botón al cuerpo del documento
    document.body.appendChild(botonRecargar);
    
}

function limpiar(){
    resultado.textContent = "";
}

function resolver(){   
    let secuencia = [];
    let numeroActual = parseFloat(resultado.textContent);
    function actualizarGrafica() {
        if (numeroActual > 1) {
            secuencia.push(numeroActual);
            
            if (numeroActual % 2 === 0) {
                numeroActual /= 2;
            } else {
                numeroActual = (numeroActual * 3) + 1;
            }

            resultado.textContent += " → " + numeroActual;
            ajustarTamaño();
            graficarCollatz(secuencia); 
            setTimeout(actualizarGrafica, 500); 
        } else {
            secuencia.push(numeroActual);
            graficarCollatz(secuencia);
        }
    }

    actualizarGrafica();
    
}

function ajustarTamaño(){
    var resultado = document.getElementById('resultado');
    var longitudTexto = resultado.textContent.length;

    if (longitudTexto > 50) {
        resultado.style.fontSize = "20px";
    } else if (longitudTexto > 30) {
        resultado.style.fontSize = "25px";
    } else {
        resultado.style.fontSize = "40px"; // Tamaño normal
    }
}

function ajustarPosicionResultado() {
    var resultado = document.getElementById('resultado');
    var overlay = document.getElementById('cuadro');

    resultado.style.position = "absolute";
    resultado.style.bottom = "100px"; // Lo colocamos en la parte baja
    resultado.style.left = "50%";
    resultado.style.transform = "translateX(-50%)";
}

function graficarCollatz(secuencia) {
    var canvas = document.getElementById('Grafica');
    var ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 50; i <= canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

   
    ctx.beginPath();
    let x = 40, y = canvas.height - 20;
    let stepX = canvas.width / secuencia.length;
    let scaleY = Math.max(...secuencia) > 50 ? 300 / Math.max(...secuencia) : 5;

    ctx.moveTo(x, y);

    for (let i = 0; i < secuencia.length; i++) {
        y = canvas.height - (secuencia[i] * scaleY);
        ctx.lineTo(x, y);

        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText(secuencia[i], x, y - 5);

        x += stepX;
    }
    
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    
}

function inicio() {
    document.getElementById('Grafica').style.display = 'none'; 
}

