const MessageService = require('./services/messageService');
const AIChatService = require('./services/aiChatService');
const messageService = new MessageService();
const aiChatService = new AIChatService();

// Nombre del bot asistente
const BOT_NAME = 'AsistenteIA';

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
      // Guardar el mensaje del usuario
      await messageService.create(data);
      
      // Verificar si el mensaje es una pregunta o contiene palabras clave para el asistente
      const userMessage = data.message.toLowerCase();
      const isQuestion = userMessage.includes('?') || 
                        userMessage.includes('cómo') || 
                        userMessage.includes('qué') || 
                        userMessage.includes('cuál') || 
                        userMessage.includes('dónde') || 
                        userMessage.includes('cuándo') || 
                        userMessage.includes('por qué') || 
                        userMessage.includes('para qué');
      
      // Verificar si el mensaje está dirigido al asistente
      const isBotMentioned = userMessage.includes('asistente') || 
                             userMessage.includes('bot') || 
                             userMessage.includes('ia');
                             
      // Verificar si el mensaje es un saludo
      const isGreeting = aiChatService.isGreeting(userMessage);
      
      // Si es una pregunta, está dirigido al asistente o es un saludo, generar una respuesta
      if (isQuestion || isBotMentioned || isGreeting) {
        // Obtener respuesta del servicio de IA
        const botResponse = aiChatService.processMessage(data.message);
        
        // Simular un pequeño retraso para que parezca que el bot está "pensando"
        setTimeout(async () => {
          // Crear y guardar la respuesta del bot
          const botMessageData = {
            username: BOT_NAME,
            message: botResponse
          };
          
          await messageService.create(botMessageData);
          
          // Enviar todos los mensajes actualizados
          const messages = await messageService.getAll();
          io.emit('all-messages', messages);
        }, 1000); // Retraso de 1 segundo
      } else {
        // Si no es una pregunta para el bot, simplemente enviar los mensajes actualizados
        const messages = await messageService.getAll();
        io.emit('all-messages', messages);
      }
    });
  });
};