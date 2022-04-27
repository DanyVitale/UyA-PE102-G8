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
    document.getElementById("resultado").innerHTML = 'Resultado';
    document.getElementById("resultado").innerHTML += '<br>';
    document.getElementById("resultado").innerHTML += '<p>Importe: ' + importe + '</p>';
    document.getElementById("resultado").innerHTML += '<p>Fecha de pago: ' + input.fechaPago + '</p>';
    document.getElementById("resultado").innerHTML += '<p>Modalidad de pago: ' + input.modalidadPago + '</p>';
}