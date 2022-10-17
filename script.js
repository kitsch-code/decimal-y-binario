// decimal a Binario
var decInput = document.getElementById('decInput');
var btnToBin = document.getElementById('btnToBin');

var resultBin = document.getElementById('resultBin');
var copyResult = document.getElementById('copyResult');
var btnCopyBin = document.getElementById('copybin');

// += A lo que ya tengo, le voy a sumar lo que le diga

btnToBin.addEventListener('click', decTobin);
function decTobin() {
    var decNum = parseInt(decInput.value);
    var binario = "";

    if (decNum < 0) {
        alert('No me hagas trampas, NO números negativos');
        refreshResult();
    } if (decNum == 0) {
        resultBin.innerText = '0';
    } else {
        while (decNum >= 1) { // Mientras que el resultado de la división sea mayor o igual a 1
            binario += (decNum % 2).toString();
            decNum = Math.floor(decNum / 2);
        }

        // Convertir el string binario a un arreglo donde separa cada caracter, lo espejea y lo vuelve a unir en un string para escribirlo como resultado
        binario = binario.split('').reverse().join('');
        resultBin.innerText = binario;
        copyResult.innerText = binario;

        if (copyResult.value.length > 0) {
            btnCopyBin.disabled = false;
    
            //Botón COPY resultado bin to hex
            //Botón COPY resultado bin to dec
            btnCopyBin.addEventListener('click', () => {
                copyResult.select();
                document.execCommand('copy');
                    
                copyDone();
            });
        } else {
            btnCopyBin.disabled = true;
        }
    }
}

decInput.addEventListener('keydown', function (e) {
    if (e.key == 'Enter' || e.code == 'Enter') {
        decTobin();
    }
});


////////
///////////
/////// Binario a decimal
var binInput = document.getElementById('binInput');
var btnToDec = document.getElementById('btnToDec');

var resultDec = document.getElementById('resultDec');
var btnCopyDec = document.getElementById('copyDec')

btnToDec.addEventListener('click', binTodec);
function binTodec() {
    var decimal = 0;
    var binNum = parseInt(binInput.value);
    if (binNum > 0) {
        binNum = binNum.toString().split('').reverse().map(Number);
        binNum.forEach(bin => {
            if(bin > 1) {
                binNum = false;
            }
        });
        if (binNum != false){
            for (i = 0; i < binNum.length; i++) {
                binNum[i] = ((Math.pow(2, i)) * binNum[i]);
                decimal += binNum[i];
                
                resultDec.innerText = decimal;
                copyResult.innerText = decimal;
            }
        } else {
            alert('La cifra ingresada NO es binaria, intenta de nuevo');
            refreshResult();
        }
    } else if(binNum == 0) {
        resultDec.innerText = '0';
        copyResult.innerText = '0';
    } else {
        alert('No me hagas trampas, NO números negativos');
        refreshResult();
    }

    if (copyResult.value.length > 0) {
        btnCopyDec.disabled = false;

        //Botón COPY resultado bin to hex
        btnCopyDec.addEventListener('click', () => {
            copyResult.select();
            document.execCommand('copy');               
            copyDone();
        });
    } else {
        btnCopyDec.disabled = true;
    }
};

binInput.addEventListener('keydown', function (e) {
    if (e.key == 'Enter' || e.code == 'Enter') {
        binTodec();
    }
});

function refreshResult() {
    resultBin.innerText = '';
    resultDec.innerText = '';
    copyResult.innerText = '';
}

function copyDone() {
    var floating = document.getElementById('floating');
    //Aparecer y ocultar mensaje flotante de link copiado
    floating.classList.add('active');

    setTimeout(function () {
        floating.classList.remove('active');
    }, 3000);
}

// Script gravity numbers
// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2 
};

var colors = [
    '#13253d',
    '#f1faee',
    '#e63946',
    '#5d88a3'
];

var gravity = 0.2;
var friction = 0.9;


// Event Listeners
addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", function() {
    canvas.width = innerWidth;	
    canvas.height = innerHeight;
init();
});


// Utility Functions
function randomIntFromRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if (this.y + this.radius + this.dy> canvas.height) {
            this.dy = -this.dy;
            this.dy = this.dy * friction;
            this.dx = this.dx * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
}


// Implementation
var ballArray = [];
function init() {
    ballArray = [];

    for (let i = 0; i < 80; i++) {
        var radius = randomIntFromRange(12, 24);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-3, 3)
        var dy = randomIntFromRange(-2, 2)
        ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init();
animate();