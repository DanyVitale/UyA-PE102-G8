$('#resultado-div').hide();
$('#resetBTN').prop('disabled', true);

$('#resetBTN').click(function(){
  $('#resultado-div').hide();
  $('#dni').prop('disabled', false);
  $('#fechaNacimiento').prop('disabled', false);
  $('#cuenta').prop('disabled', false);
  $('#importe').prop('disabled', false);
  $('#descuento').prop('disabled', false);
  $('#modalidadPago').prop('disabled', false);
  $('#fechaPago').prop('disabled', false);
  $('#sendBTN').prop('disabled', false);
  $('#resetBTN').prop('disabled', true);

  $('#dni').val('');
  $('#fechaNacimiento').val('');
  $('#cuenta').val('');
  $('#importe').val('');
  $('#descuento').val('');
  $('#modalidadPago').val('');
  $('#fechaPago').val('');
});

function validateDni(dni) {
  var numero, letr, letra;
  var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
  if(expresion_regular_dni.test (dni) == true){
      numero = dni.substr(0,dni.length-1);
      letr = dni.substr(dni.length-1,1);
      numero = numero % 23;
      letra='TRWAGMYFPDXBNJZSQVHLCKET';
      letra=letra.substring(numero,numero+1);
      if (letra!=letr.toUpperCase()) {
          return false;
      }
      else{
          return true;
      }
  }
  else{
      return false;
  }
}

function validateDate(date) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (regEx.test(date) == false) {
    return false;
  }
  var d = new Date(date);
  if (Object.prototype.toString.call(d) !== "[object Date]") {
    return false;
  }
  return !isNaN(d.getTime());
}

function validatePastDate(date) {
  if (validateDate(date) == false) {
    return false;
  }
  var d = new Date(date);
  var today = new Date();
  if (d.getTime() > today.getTime()) {
    return false;
  }
  return true;
}

function validateFutureDate(date) {
  if (validateDate(date) == false) {
    return false;
  }
  var d = new Date(date);
  var today = new Date();
  if (d.getTime() < today.getTime()) {
    return false;
  }
  return true;
}

$('#sendBTN').click(function(){

  if ($('#dni').val() == '' || $('#fechaNacimiento').val() == '' || $('#cuenta').val() == '' || $('#importe').val() == '' || $('#descuento').val() == '' || $('#modalidadPago').val() == '' || $('#fechaPago').val() == '') {
    alert('Todos los campos son obligatorios');
    return;
  }
  if (!validateDni($('#dni').val())) {
    alert('El DNI no es válido');
    return;
  }
  if (!validatePastDate($('#fechaNacimiento').val())) {
    alert('La fecha de nacimiento debe ser anterior a la actual');
    return;
  }

  let importe = $('#importe').val();
  let descuento = $('#descuento').val();
  let modalidadPago = $('#modalidadPago').val();
  let fechaPago = $('#fechaPago').val();

  let resultado = importe * (1 - descuento);
  
  if (modalidadPago != "credito") {
    fechaPago = new Date().toISOString().substring(0, 10);
  } else {
    if (!validateFutureDate(fechaPago)) {
      alert('La fecha de pago debe ser posterior a la actual');
      return;
    }
  }

  $('#resultado').html('Resultado' + '<br>' + '<p>Importe: '+
      resultado + '</p>' + '<p>Fecha de pago: ' + fechaPago +
      '</p>' + '<p>Modalidad de pago: ' + modalidadPago + '</p>');
  
  
  $('#resultado-div').show();

  $('#dni').prop('disabled', true);
  $('#fechaNacimiento').prop('disabled', true);
  $('#cuenta').prop('disabled', true);
  $('#importe').prop('disabled', true);
  $('#descuento').prop('disabled', true);
  $('#modalidadPago').prop('disabled', true);
  $('#fechaPago').prop('disabled', true);
  $('#sendBTN').prop('disabled', true);
  
  $('#resetBTN').prop('disabled', false);

});

let body = {
  token: '4N2PTAa8QWwD2kofkyxygA',
  
  data: {
    descuento: "descuento",
    dni: "dni",
    fechaNacimiento: "fechaNacimiento",
    fechaPago: "fechaPago",
    importe: "importe",
    modalidadPago: "modalidadPago",
    numCuenta: "cuenta",
    productos: [
      {
        nombre: "producto",
        precio: "precio"
      },
      {
        nombre: "producto",
        precio: "precio"
      }
    ]
  }
}

$('#receiveBTN').click(function(){
  let compra
  $.ajax({
    method: 'POST',
    url: 'https://app.fakejson.com/q/p5jU8vkt?token=' + body.token,
    data: body.data
  }).done(function(msg){
    console.log(msg);
    compra = msg;
    if (compra.modalidadPago != "credito") {
      compra.fechaPago = new Date().toISOString().substring(0, 10);
    }
    $('#resultado').html('Resultado' + '<br>' + '<p>Importe: '+
    compra.importe + '</p>' + '<p>Fecha de pago: ' + compra.fechaPago +
    '</p>' + '<p>Modalidad de pago: ' + compra.modalidadPago + '</p>');

    $('#resultado-div').show();
    $('#resetBTN').prop('disabled', false);
  });
});