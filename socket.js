const MessageService = require('./services/messageService');
const messageService = new MessageService();

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado');

    // Enviar mensajes al conectarse
    const messages = await messageService.getAll();
    socket.emit('all-messages', messages);

    // Evento para solicitar mensajes cuando se abre el chat flotante
    socket.on('get-messages', async () => {
      const messages = await messageService.getAll();
      socket.emit('all-messages', messages);
    });

    // Evento para notificar que un usuario está escribiendo
    socket.on('writing', (username) => {
      socket.broadcast.emit('writing', username);
    });

    // Evento para recibir y guardar un nuevo mensaje
    socket.on('new-message', async (data) => {
      await messageService.create(data);
      const messages = await messageService.getAll();
      io.emit('all-messages', messages);
    });
  });
};