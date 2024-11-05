// auth.js
const express = require('express');
const router = express.Router();

// Manejo del inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Lógica de autenticación simple (puedes reemplazar esto con tu propia lógica)
    if (username === 'test2024' && password === 'arrax2024*') { // Cambia esto según tus necesidades
        res.redirect('/work.html'); // Redirige a work.html tras un inicio de sesión exitoso
    } else {
        res.status(401).send('Credenciales incorrectas'); // En caso de error
    }
});

module.exports = router;
