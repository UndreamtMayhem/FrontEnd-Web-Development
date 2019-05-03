/* Remove font size */


var colors = ['#072ba0', '#e04050', '#d8ff30', '#43c9e7', '#008b50', '#ff5614', '#ffffff', '#000000'];
//need one for outline colors

var currentFontColor = "#ffffff";
var currentTextOutline = "#000000"
var currentFontSize = "36";
var currentFontStyle = "Impact";

function changeFont() {
    var x = document.getElementById('font');

    var radios = document.getElementsByName('font-type');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            currentFontStyle = radios[i].value;

            if (currentFontStyle == "Arial") {
                currentFontSize = "39";
            } else if (currentFontStyle == "Verdana") {
                currentFontSize = "37";
            } else if (currentFontStyle == "Times New Roman") {
                currentFontSize = "39";
            } else if (currentFontStyle == "Courier New") {
                currentFontSize = "32";
            } else if (currentFontStyle == "serif") {
                currentFontSize = "30";
            } else if (currentFontStyle == "sans-serif") {
                currentFontSize = "38";
            } else if (currentFontStyle == "impact") {
                currentFontSize = "36";
            }

            break;
        }
    }

    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText, currentFontColor, currentTextOutline, currentFontSize, currentFontStyle);

}

function CreateTextColors() {
    var colorBoxes = document.querySelector(".font-color-choice");

    function changeMemeFontColor() {
        currentFontColor = this.style.backgroundColor;
        redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText, this.style.backgroundColor, currentTextOutline, currentFontSize, currentFontStyle);
    }
    for (var i = 0; i < colors.length; i++) {
        var newColorDiv = document.createElement('div');
        newColorDiv.className = 'color-box';
        newColorDiv.style.backgroundColor = colors[i];
        newColorDiv.addEventListener("click", changeMemeFontColor)
        colorBoxes.appendChild(newColorDiv);
    }
}

CreateTextColors();

//work on font outline colors
function CreateOutlineTextColors() {
    var colorBoxes = document.querySelector(".font-outline-color-choice");

    function changeMemeFontColor() {
        currentTextOutline = this.style.backgroundColor;
        redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText, currentFontColor, this.style.backgroundColor, currentFontSize, currentFontStyle);
    }
    for (var i = 0; i < colors.length; i++) {
        var newColorDiv = document.createElement('div');
        newColorDiv.className = 'color-box';
        newColorDiv.style.backgroundColor = colors[i];
        newColorDiv.addEventListener("click", changeMemeFontColor)
        colorBoxes.appendChild(newColorDiv);
    }
}

CreateOutlineTextColors();

//need to remember current color somehow
function textChangeListener(evt) {
    var id = evt.target.id;
    var text = evt.target.value;
    if (id == "topLineText") {
        window.topLineText = text;
    } else {
        window.bottomLineText = text;
    }
    //wrap text function
    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText, currentFontColor, currentTextOutline, currentFontSize, currentFontStyle);
}

function changeFontColor() {
    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText, "#072ba0");
}
//feed these values
function redrawMeme(image, topLine, bottomLine, fillStyle, textOutline, fontSize, fontStyle) {
    // Get Canvas2DContext
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "pt " + fontStyle;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = "center";
    ctx.lineWidth = "3";
    ctx.strokeStyle = textOutline;


    if (topLine != null) {
        wrapText(ctx, topLine, canvas.width / 2, 40, 250, 55);
    }

    if (bottomLine != null) {
        wrapText(ctx, bottomLine, canvas.width / 2, canvas.height - 90, 250, 40);
    }
}

function saveFile() {
    // save canvas image as data url (png format by default)
    var canvas = document.querySelector('canvas');
    var dataURL = canvas.toDataURL();

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    var file = document.getElementById('canvasImg').src = dataURL;
    window.open(file);
}


function handleFileSelect(evt) {
    var canvasWidth = 500;
    var canvasHeight = 500;
    var file = evt.target.files[0];

    var reader = new FileReader();
    reader.onload = function(fileObject) {
        var data = fileObject.target.result;

        // Create an image object
        var image = new Image();
        image.onload = function() {

            window.imageSrc = this;
            redrawMeme(window.imageSrc, null, null);
        }

        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
    };
    reader.readAsDataURL(file)
}

window.topLineText = "";
window.bottomLineText = "";

var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');

input1.oninput = textChangeListener;
input2.oninput = textChangeListener;


document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.getElementById('saveBtn').addEventListener('click', saveFile, false);



function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    //reduce text if charcter is ten
    console.log("i am being called");
    ReduceText(text);
    var line = '';
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        //we need to get the context of canvas to measure text
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            context.strokeText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
}

var reachedZero = true;
var currentTextLen = 0;


function ReduceText(text) {
    if (currentTextLen < text.length) {
        if (text.length == 10) {
            currentTextLen = text.length;
            var fontSizeInt = parseInt(currentFontSize);
            fontSizeInt -= 2;
            currentFontSize = fontSizeInt.toString();
        } else if (text.length == 20) {
            currentTextLen = text.length;
            var fontSizeInt = parseInt(currentFontSize);
            fontSizeInt -= 2;
            currentFontSize = fontSizeInt.toString();
        } else if (text.length == 29) {
            currentTextLen = text.length;
            var fontSizeInt = parseInt(currentFontSize);
            fontSizeInt -= 2;
            currentFontSize = fontSizeInt.toString();
        }
    } else if (currentTextLen > text.length) {
        if (text.length == 10) {
            currentTextLen = text.length;
            var fontSizeInt = parseInt(currentFontSize);
            fontSizeInt += 2;
            currentFontSize = fontSizeInt.toString();
        } else if (text.length == 20) {
            currentTextLen = text.length;
            var fontSizeInt = parseInt(currentFontSize);
            fontSizeInt += 2;
            currentFontSize = fontSizeInt.toString();
        } else if (text.length == 29) {
            currentTextLen = text.length;
            var fontSizeInt = parseInt(currentFontSize);
            fontSizeInt += 2;
            currentFontSize = fontSizeInt.toString();
        }
    }
}