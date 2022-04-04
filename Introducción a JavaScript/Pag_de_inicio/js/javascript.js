var compra = {
    "dni": "12345678A",
    "fechaNacimiento": "1980-01-01",
    "numCuenta": "123456789",
    "productos": [
        {
            "nombre": "camiseta",
            "precio": 10
        },
        {
            "nombre": "pantalon",
            "precio": 20
        }
    ],
    "descuento": 0.1,
    "modalidadPago": "contrareembolso",
    "importe": 30
};

// insertarTexto() recibe una cadena de texto
function showText(texto) {
    var texto = document.getElementById("texto").value;
    document.getElementById("output").innerHTML = texto;
}

// Script que muestra un informe de la cantidad de párrafos,  items de lista y elementos div en la página de inicio.
function getNumberOfItems() {
    var nParr = document.getElementsByTagName("p");
    var nList = document.getElementsByTagName("li");
    var nDiv = document.getElementsByTagName("div");
    
    document.getElementById("parrafos").innerHTML = "Párrafos: " + nParr.length;
    document.getElementById("items").innerHTML = "Items: " + nList.length;
    document.getElementById("divs").innerHTML = "Divs: " + nDiv.length;
}

function calcularImporte(compra) {
    importe = compra.importe;
    importe *= (1 - compra.descuento);
    return importe;
}


function calculate () {
    var input = {
        "dni": document.getElementById("dni").value,
        "fechaNacimiento": document.getElementById("fechaNacimiento").value,
        "numCuenta": document.getElementById("cuenta").value,
        "importe": document.getElementById("importe").value,
        "descuento": document.getElementById("descuento").value,
        "modalidadPago": document.getElementById("modalidadPago").value,
        "fechaPago": document.getElementById("fechaPago").value
    };
    var importe = calcularImporte(input);
    if (input.modalidadPago != "credito") {
        input.fechaPago = new Date().toISOString().substring(0, 10);
    }
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").appendChild(document.createTextNode("Importe: " + importe));
    document.getElementById("resultado").appendChild(document.createElement("br"));
    document.getElementById("resultado").appendChild(document.createTextNode("Fecha de pago: " + input.fechaPago));
    document.getElementById("resultado").appendChild(document.createElement("br"));
    document.getElementById("resultado").appendChild(document.createTextNode("Modalidad de pago: " + input.modalidadPago));
}