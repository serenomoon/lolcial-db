const express = require('express');
const router = express.Router();
const User = require('../models/Usuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
        ok: true,
        users
})
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }

});

module.exports = router;