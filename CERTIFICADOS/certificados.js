function generarCertificado() {
  // Obtenemos los valores de los campos del formulario
  var nombre = document.getElementById("input-nombre").value;
  var apellido = document.getElementById("input-apellido").value;
  var curso = document.getElementById("input-curso").value;
  var textoPersonalizado = document.getElementById("input-texto-personalizado").value;
  var imagenFondo = document.getElementById("input-imagen-fondo").files[0];
  var imagenFirma = document.getElementById("input-imagen-firma").files[0];
  
  // Creamos un objeto FileReader para leer la imagen de fondo
  var readerFondo = new FileReader();
  readerFondo.onload = function(event) {
    // Creamos un objeto Image para cargar la imagen de fondo
    var imagenFondoObj = new Image();
    imagenFondoObj.onload = function() {
      // Creamos un objeto canvas para dibujar el certificado
      var canvas = document.createElement("canvas");
      canvas.width = imagenFondoObj.width;
      canvas.height = imagenFondoObj.height;
      var contexto = canvas.getContext("2d");
      contexto.drawImage(imagenFondoObj, 0, 0);
      
      // Escribimos los datos del certificado en el canvas
      contexto.font = "bold 36px Arial";
      contexto.fillStyle = document.getElementById("input-color-nombre").value;
      contexto.fillText(nombre + " " + apellido, 300, 300);
      
      contexto.font = "bold 24px Arial";
      contexto.fillStyle = document.getElementById("input-color-curso").value;
      contexto.fillText(curso, 300, 360);
      
      contexto.font = "18px Arial";
      contexto.fillStyle = document.getElementById("input-color-texto-personalizado").value;
      contexto.fillText(textoPersonalizado, 300, 400);
      
      // Cargamos la imagen de la firma en el canvas
      var readerFirma = new FileReader();
      readerFirma.onload = function(event) {
        var imagenFirmaObj = new Image();
        imagenFirmaObj.onload = function() {
          contexto.drawImage(imagenFirmaObj, 450, 450, 200, 100);
          
          // Mostramos el certificado en el HTML
          document.getElementById("certificado").src = canvas.toDataURL();
        };
        imagenFirmaObj.src = event.target.result;
      };
      readerFirma.readAsDataURL(imagenFirma);
    };
    imagenFondoObj.src = event.target.result;
  };
  readerFondo.readAsDataURL(imagenFondo);
}

function descargarCertificado() {
  // Generamos el certificado
  generarCertificado();
  
  // Descargamos el documento PDF
  var doc = new jsPDF();
  var imgData = document.getElementById("certificado").src;
  doc.setFontSize(12);
  doc.text(10, 10, 'Certificado de Fin de Curso');
  doc.addImage(imgData, 'PNG', 15, 15, 180, 160);
  doc.save('Certificado.pdf');
}
