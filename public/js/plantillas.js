// Función para capturar los IDs de los campos vacíos
function obtenerCamposVacios(campos) {

    const camposVacios = [];

    // Recorrer los campos y verificar cuáles están vacíos
    campos.forEach(id => {
        const campo = document.getElementById(id);
        // Verificar si el campo existe y está vacío o contiene solo espacios
        if (campo && (campo.value.trim() === "")) {
            // Agregar el ID del campo vacío al array
            camposVacios.push(id);
        }
    });

    return camposVacios; // Retorna el array con los IDs de los campos vacíos
}


// Función para copiar texto
function copiarTexto(texto) {
    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado al portapapeles: " + texto);
    }).catch(err => {
        console.error("Error al copiar al portapapeles: ", err);
    });
}

//Funcion para generar plantilla de venta ok
function ventaOK() {


    const tecnologia = "Fija";
    const cedula = document.getElementById("cedula");
    const back = document.getElementById("back");
    const ciudad = document.getElementById("ciudad");
    const aliado = document.getElementById("aliado");
    const franja = document.getElementById("franjaAgendaBack");
    const fecha = document.getElementById("fechaAgendaBack");
    const fs = document.getElementById("FS");
    const orden = document.getElementById("orden");
    const firma = document.getElementById("firma");
    const base = document.getElementById("base");


    //lista de ids 
    //let campos = ['aliado', 'franja', 'fecha', 'fs', 'orden', 'firma','ciudad','back','cedula','tecnologia'];
    let campos = ['base','firma', 'estadoVenta', 'orden', 'FS', 'fechaAgendaBack', 'franjaAgendaBack', 'usuario', 'aliado', 'zona', 'correoXaltech']

    listaCamposVacios = obtenerCamposVacios(campos);

    if (listaCamposVacios.length > 0) {

        // Convertir todos los elementos de la lista a mayúsculas
        const listaMayusculas = listaCamposVacios.map(campo => campo.toUpperCase());

        alert('Existen campos vacíos: ' + listaMayusculas.join(', '));


    } else {
        const texto_copia = `CC: ${cedula.value}\nOrden: ${orden.value}\nFS: ${fs.value}\nFirma: ${firma.value} - ${aliado.value}\nAgenda: ${fecha.value} - ${franja.value}\nBase:${base.value}\n${back.value}\n${ciudad.value}\n${tecnologia}`;
        copiarTexto(texto_copia);
    }

}

//Funcion para generar plantilla de novedad-creacion complemento - cancelacion

function plantillCancelacionNovedadCreacion() {

    const campos = [
        "tecnologia",
        "cedula",
        "back",
        "ciudad",
        "base",
        "observacionesBack"
    ];

    const observacion = document.getElementById("observacionesBack");
    const tecnologia = "Fija";
    const cedula = document.getElementById("cedula");
    const back = document.getElementById("back");
    const ciudad = document.getElementById("ciudad");
    const base = document.getElementById("base");

    listaCamposVacios = obtenerCamposVacios(campos);

    if (listaCamposVacios.length > 0) {

        // Convertir todos los elementos de la lista a mayúsculas
        const listaMayusculas = listaCamposVacios.map(campo => campo.toUpperCase());

        alert('Existen campos vacíos: ' + listaMayusculas.join(', '));


    } else {
        const texto_copia = `${observacion.value}\n${tecnologia}\n${cedula.value}\n${back.value}\n${ciudad.value}\n${base.value}\n`;
        copiarTexto(texto_copia);
    }
}



//Funcion para venta ok

function prevalidacionOK() {
    const tecnologia = "Fija"
    const cedula = document.getElementById("cedula"); // Guarda el elemento, no solo el valor
    const back = document.getElementById("back").value;
    const base = document.getElementById("base").value;

    const caso = "Prevalidación OK";

    // Limpiar el borde rojo antes de verificar
    cedula.classList.remove("borde-rojo");

    if (cedula.value === "") {
        // Cambia el estilo del borde a rojo
        cedula.classList.add("borde-rojo");
        alert("La cédula del titular no puede ser un campo vacío");
    } else {
        // Crear el texto a copiar
        const textoACopiar = `${caso}\n${back}\n${tecnologia}\n${cedula.value}\n${base}`;
        copiarTexto(textoACopiar);
    }
}

//Creacion de complemento interna
function creacionCompInterna() {

    

    const tecnologia = 'Fija';
    const cedula = document.getElementById("cedula");
    const back = document.getElementById("back");
    const ciudad = document.getElementById("ciudad");
    
    const celular1 = document.getElementById("celular1");
    const celular2 = document.getElementById("celular2");
    const telefono = `${celular1.value} - ${celular2.value}`;

    const nombre = document.getElementById("nombre");
    const observacion_creacion_com = 'SOLICITO POR FAVOR LA CREACION DEL COMPLEMENTO ';
    const asesor = document.getElementById('asesor');

    const campos = [
        "estadoVenta",
        "motivoCancelacion",    
        "direccionPlaca",
        "complemento",
        "cto",
        "direcionCto",
        "subcluster",
        "observacionesComp",
        "barrio",
        'base'
    ];

    listaCamposVacios = obtenerCamposVacios(campos);

    if (listaCamposVacios.length > 0) {

        // Convertir todos los elementos de la lista a mayúsculas
        const listaMayusculas = listaCamposVacios.map(campo => campo.toUpperCase());

        alert('Existen campos vacíos: ' + listaMayusculas.join(', '));


    } else {
        const texto_interna = `Cedula: ${cedula.value}\nNombre: ${nombre.value}\nTelefono: ${telefono}\nObservacion: ${observacion_creacion_com} ${complemento.value.toUpperCase()}\nAsesor: ${asesor.value}\nBase: ${base.value}\nBack: ${back.value}\nCiudad: ${ciudad.value}\n${tecnologia}`

        copiarTexto(texto_interna);
    }


}
