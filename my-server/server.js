const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist/nivel45/browser')));

// Manejar solicitud a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/nivel45/browser/index.html'));
});

// Manejar solicitud a la raíz
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/nivel45/browser/index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
