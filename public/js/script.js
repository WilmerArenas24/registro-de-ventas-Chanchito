const ventaok = {
    "Firma": "firma",
    "Estado Venta": "estadoVenta",
    "Orden": "orden",
    "FS": "FS",
    "Fecha Agenda": "fechaAgendaBack",
    "Franja Agenda": "franjaAgendaBack",
    "Usuario": "usuario",
    "Aliado": "aliado",
    "Zona": "zona",
    "Correo Xaltech": "correoXaltech"
};

const novedad_cancelacion = {
    "Estado Venta": "estadoVenta",
    "Motivo": "motivoCancelacion"
};

const prevalidacion = {
    "Zona": "zona",
    "Estado Venta": "estadoVenta"

};

const creacionComplemento = {
    "Estado Venta": "estadoVenta",
    "Motivo": "motivoCancelacion",

    "Dirección placa": "direccionPlaca",
    "Complemento": "complemento",
    "CTO Asociada": "cto",
    "Dirección CTO": "direcionCto",
    "Subcluster": "subcluster",
    "Observaciones": "observacionesComp",
    "Barrio": "barrio"
};



// Función para crear los campos
function crearCampos(campos) {
    const divPrincipal = document.getElementById('gestionVenta');

    // Limpiar el contenedor antes de agregar nuevos campos
    divPrincipal.innerHTML = '';

    // Iterar sobre cada entrada del objeto
    for (const [labelText, inputId] of Object.entries(campos)) {
        let elementoDiv = document.createElement('div');
        elementoDiv.setAttribute('class', 'resultado-form');

        // Crear el elemento label
        const elementoLabel = document.createElement('label');
        elementoLabel.setAttribute('for', inputId);
        elementoLabel.textContent = labelText; // Establecer el texto del label

        // Crear el elemento input
        const elementoInput = document.createElement('input');
        elementoInput.setAttribute('id', inputId); // Establecer el ID del input
        elementoInput.setAttribute('name', inputId); // Establecer el name del input

        // Añadir los elementos al div principal
        elementoDiv.appendChild(elementoLabel);
        elementoDiv.appendChild(elementoInput);

        divPrincipal.appendChild(elementoDiv);
    }
}


// Función para crear botones
function crearBotones(id, textContent) {


    let divPrincipal = document.getElementById('botonesFormulario');
    let elementoBoton = document.createElement('button');

    elementoBoton.setAttribute('class', 'button');
    elementoBoton.setAttribute('id', id);

    // Asignar el texto "Guardar" al botón
    elementoBoton.textContent = textContent;

    divPrincipal.appendChild(elementoBoton);
}




// Asignar la función a los enlaces
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace

        // Obtener el nombre del objeto a partir del atributo data-campos
        const camposNombre = event.target.getAttribute('data-campos');
        const botonPlantilla = document.getElementById('plantillaButton');

        // Llamar a la función crearCampos con el objeto correspondiente
        if (camposNombre === 'creacionComplemento') {

            //Creando los botones par aplantilla
            botonPlantilla.onclick = creacionCompInterna;
        
            crearCampos(creacionComplemento);
        } else if (camposNombre === 'novedad_cancelacion') {
            botonPlantilla.onclick = plantillCancelacionNovedadCreacion;
            crearCampos(novedad_cancelacion);

        } else if (camposNombre === 'ventaok') {
            botonPlantilla.onclick = ventaOK;
            crearCampos(ventaok);
    
        }

        else if (camposNombre === 'prevalidacionOK') {        
            crearCampos(prevalidacion);
            botonPlantilla.onclick = prevalidacionOK;
        }
    });
});


//Creando los botones
crearBotones("updateButton", 'Guardar Datos'); //Boton guardar datos pricnipales
crearBotones("updateButtonVentaOK","Venta OK")//Boton venta ok
crearBotones("updateButtonPrevalidacion","Prevalidacion") //Boton prevalidacion
crearBotones("updateButtonComplementoNovedad","Novedad")//Boton cancelacion novedad complemento






// Manejar la búsqueda al enviar el formulario
document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    const divPrincipal = document.getElementById('gestionVenta');   
    divPrincipal.innerHTML = '';

    const cedula = document.getElementById("cedula").value;

    fetch(`/search/${cedula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Registro no encontrado");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verificar la estructura de la respuesta JSON

            // Mostrar el resultado en el formulario
            document.getElementById('documento').value = data.cedula || ''; // Asignar la cédula directamente
            document.getElementById('nombre').value = data.nombreCompleto || '';
            document.getElementById('ciudad').value = data.ciudad || '';
            document.getElementById('nombreConjunto').value = data.barrioNombreConjunto || '';
            document.getElementById('direccion').value = data.direccionCompleta || '';
            document.getElementById('fechaInstalacion').value = data.fechaInstalacion || '';
            document.getElementById('franja').value = data.franja || '';
            document.getElementById('tipoVenta').value = data.tipoVenta || '';
            document.getElementById('fechaExpedicion').value = data.fechaExp || '';
            document.getElementById('celular1').value = data.celular || '';
            document.getElementById('nombreReferencia').value = data.nombreReferencia || '';
            document.getElementById('celular2').value = data.celular2 || '';
            document.getElementById('correo').value = data.correo || '';
            document.getElementById('estrato').value = data.estrato || '';
            document.getElementById('planBa').value = data.planBa || '';
            document.getElementById('decos').value = data.decos || '';
            document.getElementById('asesor').value = data.asesor || '';

            console.log(document.getElementById('asesor').value = data.asesor || '')
        })
        .catch(error => {
            alert(error.message); // Mostrar mensaje si no se encuentra el registro
        });
});


//Se actualiza datos de un registro sin subir 
document.getElementById("updateButton").addEventListener("click", function () {
    const cedula = document.getElementById("documento").value; // Obtener la cédula
    const newData = {
        asesor: document.getElementById("asesor").value,
        fechaInstalacion: document.getElementById("fechaInstalacion").value,
        franja: document.getElementById("franja").value,
        ciudad: document.getElementById("ciudad").value,
        barrioNombreConjunto: document.getElementById("nombreConjunto").value,
        direccionCompleta: document.getElementById("direccion").value,
        tipoVenta: document.getElementById("tipoVenta").value,
        cedula: cedula,
        fechaExp: document.getElementById("fechaExpedicion").value,
        nombreCompleto: document.getElementById("nombre").value,
        celular: document.getElementById("celular1").value,
        nombreReferencia: document.getElementById("nombreReferencia").value,
        celular2: document.getElementById("celular2").value,
        correo: document.getElementById("correo").value,
        estrato: document.getElementById("estrato").value,
        planBa: document.getElementById("planBa").value,
        decos: document.getElementById("decos").value,
        back: document.getElementById("back").value,
        observacionesBack: document.getElementById("observacionesBack").value,


    };

    fetch(`/update/${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar los datos");
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data); // Verificar la respuesta del servidor
            if (data.success) {
                alert("Datos guardados correctamente");
            } else {
                alert("Error en la respuesta: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error de conexión:', error);
            alert('Error de conexión: ' + error.message);
        });
});


//Cuando se guarda una venta ok

document.getElementById("updateButtonVentaOK").addEventListener("click", function () {
    const cedula = document.getElementById("documento").value; // Obtener la cédula
    const newData = {

        //Correspnde al informacio cuando se sube la venta
        firma: document.getElementById("firma").value,
        estadoVenta: document.getElementById("estadoVenta").value,
        orden: document.getElementById("orden").value,
        FS: document.getElementById("FS").value,
        fechaAgendaBack: document.getElementById("fechaAgendaBack").value,
        franjaAgendaBack: document.getElementById("franjaAgendaBack").value,
        usuario: document.getElementById("usuario").value,
        aliado: document.getElementById("aliado").value,
        zona: document.getElementById("zona").value,
        correoXaltech: document.getElementById("correoXaltech").value

        //Corresponde a una novedad


    };

    fetch(`/update/${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar los datos");
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data); // Verificar la respuesta del servidor
            if (data.success) {
                alert("Datos guardados correctamente");
            } else {
                alert("Error en la respuesta: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error de conexión:', error);
            alert('Error de conexión: ' + error.message);
        });
});



//SE GUARDA UNA CANCELACION O UNA NOVEDAD
document.getElementById("updateButtonComplementoNovedad").addEventListener("click", function () {
    const cedula = document.getElementById("documento").value; // Obtener la cédula
    const newData = {

        estadoVenta: document.getElementById("estadoVenta").value,
        motivoCancelacion: document.getElementById("motivoCancelacion").value,
        back: document.getElementById('back').value


        //Corresponde a una novedad


    };

    fetch(`/update/${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar los datos");
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data); // Verificar la respuesta del servidor
            if (data.success) {
                alert("Datos guardados correctamente");
            } else {
                alert("Error en la respuesta: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error de conexión:', error);
            alert('Error de conexión: ' + error.message);
        });
});

//SE GUARDA UNA PREVALIDACION
document.getElementById("updateButtonPrevalidacion").addEventListener("click", function () {
    const cedula = document.getElementById("documento").value; // Obtener la cédula
    const newData = {

        estadoVenta: document.getElementById("estadoVenta").value,
        zona: document.getElementById("zona").value,
        back: document.getElementById('back').value

    };

    fetch(`/update/${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar los datos");
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data); // Verificar la respuesta del servidor
            if (data.success) {
                alert("Datos guardados correctamente");
            } else {
                alert("Error en la respuesta: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error de conexión:', error);
            alert('Error de conexión: ' + error.message);
        });
});

