# Zazzermind App - Backend

Backend para la aplicación SaaS de automatización de mensajes motivacionales vía WhatsApp.

## 🚀 Características

- Conexión con WhatsApp Web
- Envío de mensajes automatizados
- Reconexión automática
- API REST para gestión de mensajes
- Eventos en tiempo real con Socket.IO

## 📋 Prerrequisitos

- Node.js 16.x o superior
- npm o yarn
- PM2 (para producción)
- Navegador Chrome/Chromium (para WhatsApp Web)
- Git

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/zazzermind-app.git
cd zazzermind-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Ajustar las variables según tu entorno

## 🏃‍♂️ Desarrollo

1. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

2. El servidor estará disponible en `http://localhost:3000`

3. Para conectar WhatsApp:
   - Abre el frontend en `http://localhost:5173`
   - Escanea el código QR que aparecerá
   - Espera a que se establezca la conexión

## 🚀 Producción

1. Construir la aplicación:
```bash
npm run build
```

2. Iniciar con PM2:
```bash
pm2 start pm2.config.js
```

3. Verificar el estado:
```bash
pm2 status
pm2 logs
```

## 📦 Despliegue en Railway

1. Crear una cuenta en [Railway](https://railway.app)
2. Conectar el repositorio de GitHub
3. Configurar las variables de entorno en Railway:
   - `PORT`
   - `FRONTEND_URL`
   - `NODE_ENV`
   - `WHATSAPP_CLIENT_ID`
4. Deploy automático al hacer push a main

## 🔌 API Endpoints

### GET /api/whatsapp/status
Obtiene el estado de la conexión de WhatsApp

### POST /api/whatsapp/send
Envía un mensaje de WhatsApp

Body:
```json
{
  "to": "1234567890",
  "message": "¡Hola! Este es un mensaje motivacional"
}
```

## 📡 Eventos Socket.IO

- `qr`: Emite el código QR para conectar WhatsApp
- `session_status`: Estado de la sesión (connected/disconnected)
- `message_sent`: Confirmación de mensaje enviado
- `message_error`: Error al enviar mensaje

## 📝 TODO

- [ ] Implementar múltiples cuentas de WhatsApp
- [ ] Agregar historial de mensajes
- [ ] Panel de administración
- [ ] Sistema de plantillas de mensajes
- [ ] Programación de mensajes

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

MIT

## 📧 Contacto

Tu Nombre - [instagram.com/zazzer___) - zazzerwebs@gmail.com

Link del Proyecto: ( https://github.com/emzza/wzpBackend/ )
