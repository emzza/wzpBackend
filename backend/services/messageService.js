const { body, validationResult } = require('express-validator');
const { sendMessage } = require('../whatsapp');

const validateMessageRequest = [
  body('to')
    .notEmpty()
    .withMessage('El número de teléfono es requerido')
    .matches(/^[0-9]+$/)
    .withMessage('El número debe contener solo dígitos'),
  body('message')
    .notEmpty()
    .withMessage('El mensaje es requerido')
    .isLength({ min: 1, max: 4096 })
    .withMessage('El mensaje debe tener entre 1 y 4096 caracteres')
];

const sendWhatsAppMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { to, message } = req.body;
    const response = await sendMessage(to, message);
    res.json({
      success: true,
      messageId: response.id.id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  validateMessageRequest,
  sendWhatsAppMessage
}; 