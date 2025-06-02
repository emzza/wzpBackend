const express = require('express');
const router = express.Router();
const { getConnectionStatus } = require('../whatsapp');
const { validateMessageRequest, sendWhatsAppMessage } = require('../services/messageService');

// Obtener estado de la conexión
router.get('/status', (req, res) => {
  const status = getConnectionStatus();
  res.json({ status });
});

// Enviar mensaje
router.post('/send', validateMessageRequest, sendWhatsAppMessage);

module.exports = router; 