const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');

let client = null;

const initializeWhatsApp = () => {
  //client es el cliente de whatsapp
  client = new Client({
    //authStrategy es la estrategia de autenticación
    authStrategy: new LocalAuth({
      //clientId es el id del cliente
      clientId: 'zazzermind',
      //dataPath es la ruta de los datos de la sesión
      dataPath: path.join(__dirname, '../sessions')
    }),
    //puppeteer es el navegador que se utiliza para la autenticación
    puppeteer: {
      args: ['--no-sandbox']
    }
  });
  //on es para escuchar un evento
  client.on('qr', async (qr) => {
    try {   
      //qrcode es el codigo de verificacion
      const qrDataUrl = await qrcode.toDataURL(qr);
      //emit es para enviar un evento al cliente
      global.io.emit('qr', qrDataUrl);
    } catch (err) {
      console.error('Error al generar QR:', err);
    }
  });

  client.on('ready', () => {
    console.log('Cliente WhatsApp conectado');
    global.io.emit('session_status', { status: 'connected' });
  });

  client.on('disconnected', () => {
    console.log('Cliente WhatsApp desconectado');
    global.io.emit('session_status', { status: 'disconnected' });
  });

  client.initialize();
  return client;
};

const sendMessage = async (to, message) => {
  try {
    if (!client) {
      throw new Error('Cliente WhatsApp no inicializado');
    }

    const formattedNumber = to.includes('@c.us') ? to : `${to}@c.us`;
    const response = await client.sendMessage(formattedNumber, message);
    
    global.io.emit('message_sent', {
      to,
      messageId: response.id.id,
      timestamp: new Date().toISOString()
    });

    return response;
  } catch (error) {
    global.io.emit('message_error', {
      to,
      error: error.message
    });
    throw error;
  }
};

const getConnectionStatus = () => {
  if (!client) return 'not_initialized';
  return client.info ? 'connected' : 'disconnected';
};

module.exports = {
  initializeWhatsApp,
  sendMessage,
  getConnectionStatus
}; 