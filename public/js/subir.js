function uploadFile() {
    const form = document.getElementById('subir-archivo');
    const formData = new FormData(form);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  // Cambié a .text() si tu respuesta es en texto plano
    .then(data => {
        alert(data);  // Muestra el mensaje de éxito o error en un alert
    })
    .catch(error => {
        alert('Error al subir el archivo');
    });
}