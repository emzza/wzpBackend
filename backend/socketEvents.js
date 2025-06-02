const setupSocketEvents = (io, whatsappClient) => {
  // Hacer el objeto io disponible globalmente
  global.io = io;

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Emitir estado actual de la sesión
    const status = whatsappClient ? 'connected' : 'disconnected';
    socket.emit('session_status', { status });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};

module.exports = {
  setupSocketEvents
}; 