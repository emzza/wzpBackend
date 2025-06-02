require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const whatsappRoutes = require('./routes/whatsappRoutes');
const { initializeWhatsApp } = require('./whatsapp');
const { setupSocketEvents } = require('./socketEvents');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/whatsapp', whatsappRoutes);

// Inicializar WhatsApp
const whatsappClient = initializeWhatsApp();

// Configurar eventos de Socket.IO
setupSocketEvents(io, whatsappClient);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 