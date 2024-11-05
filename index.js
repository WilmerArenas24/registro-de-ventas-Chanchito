const express = require('express');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs'); // Para interactuar con el sistema de archivos

const authRoutes = require('./public/js/auth'); // Importa las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Usa las rutas de autenticación
app.use(authRoutes); // Monta el router de autenticación

// Configurar el almacenamiento de multer para que guarde el archivo como 'ventas.xlsx'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    cb(null, 'ventas.xlsx'); // Asigna un nombre fijo al archivo
  }
});

// Inicializa el middleware de multer
const upload = multer({ storage: storage });

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Ruta para subir un archivo
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.send('Archivo subido con éxito como: ventas.xlsx');
  } catch (error) {
    res.status(400).send('Error al subir el archivo');
  }
});

// Función para convertir la fecha de Excel
function convertExcelDate(serial) {
  const millisecondsPerDay = 86400 * 1000;
  const excelEpoch = new Date(Date.UTC(1900, 0, 1));
  return new Date(excelEpoch.getTime() + (serial - 25569) * millisecondsPerDay);
}

// Endpoint para leer datos del archivo Excel y devolver en JSON
app.get('/read-excel', (req, res) => {
  const filename = 'ventas.xlsx'; // Nombre fijo del archivo

  // Ruta completa del archivo Excel
  const filePath = path.join(__dirname, 'uploads', filename);

  try {
    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Obtener el nombre de la primera hoja
    const worksheet = workbook.Sheets[sheetName];

    // Convertir los datos de la hoja a JSON, incluyendo columnas vacías
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    // Devolver todos los datos como respuesta
    res.json(data);
  } catch (error) {
    res.status(500).send('Error al leer el archivo Excel: ' + error.message);
  }
});

// Endpoint para buscar un registro por CEDULA
app.get('/search/:cedula', (req, res) => {
  const cedula = req.params.cedula; // Obtener la cédula del parámetro de la URL
  const filename = 'ventas.xlsx'; // Nombre fijo del archivo

  // Ruta completa del archivo Excel
  const filePath = path.join(__dirname, 'uploads', filename);

  try {
      // Leer el archivo Excel
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Obtener el nombre de la primera hoja
      const worksheet = workbook.Sheets[sheetName];

      // Convertir los datos de la hoja a JSON, incluyendo columnas vacías
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // Buscar el registro que coincida con la cédula
      const result = data.find(record => record.cedula.toString() === cedula); // Ajusta "CEDULA" al nombre exacto de la columna en el Excel

      if (result) {
          res.json(result); // Devolver el registro encontrado sin modificaciones
      } else {
          res.status(404).send('Registro no encontrado'); // En caso de que no se encuentre el registro
      }
  } catch (error) {
      res.status(500).send('Error al leer el archivo Excel: ' + error.message);
  }
});

// Endpoint para descargar el archivo Excel
app.get('/download', (req, res) => {
    const filename = 'ventas.xlsx'; // Nombre del archivo a descargar
    const filePath = path.join(__dirname, 'uploads', filename); // Ruta completa del archivo
  
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send('Error al descargar el archivo: ' + err.message);
      } else {
        console.log('Archivo descargado:', filename);
      }
    });
});

// Endpoint para actualizar un registro por CEDULA
app.put('/update/:cedula', express.json(), (req, res) => {
  const cedula = req.params.cedula; // Obtener la cédula del parámetro de la URL
  const newData = req.body; // Nuevos datos a actualizar
  const filename = 'ventas.xlsx'; // Nombre fijo del archivo

  // Ruta completa del archivo Excel
  const filePath = path.join(__dirname, 'uploads', filename);

  try {
    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Obtener el nombre de la primera hoja
    const worksheet = workbook.Sheets[sheetName];

    // Convertir los datos de la hoja a JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    // Buscar el índice del registro que coincide con la cédula
    const index = data.findIndex(record => record.cedula.toString() === cedula);

    if (index !== -1) {
      // Actualizar el registro con los nuevos datos
      data[index] = { ...data[index], ...newData };

      // Convertir de nuevo los datos a una hoja
      const newWorksheet = XLSX.utils.json_to_sheet(data);
      workbook.Sheets[sheetName] = newWorksheet;

      // Escribir el archivo Excel de nuevo
      XLSX.writeFile(workbook, filePath);

      res.json({ 
        success: true, // Indicar éxito
        message: 'Registro actualizado con éxito', 
        updatedRecord: data[index] // Enviar el registro actualizado como respuesta
      });
    } else {
      res.status(404).json({ 
        success: false, // Indicar que no se encontró el registro
        message: 'Registro no encontrado' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, // Indicar error en el servidor
      message: 'Error al actualizar el archivo Excel: ' + error.message 
    });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
