/**
 * Servicio de IA para el chat
 * Proporciona respuestas inteligentes sobre el sistema
 */
class AIChatService {
    constructor() {
        // Base de conocimiento sobre el sistema
        this.knowledgeBase = {
            sistema: "Esta es una aplicación web desarrollada con Node.js, Express y MongoDB que permite gestionar películas, géneros y calificaciones. Incluye un sistema de autenticación y un chat en tiempo real.",
            peliculas: "El módulo de películas permite crear, editar, eliminar y visualizar películas. Cada película tiene un título, descripción, año de lanzamiento, duración y género asociado.",
            generos: "El módulo de géneros permite administrar las categorías de películas. Puedes crear, editar y eliminar géneros que luego se asocian a las películas.",
            calificaciones: "El sistema de calificaciones permite a los usuarios valorar películas con puntuaciones de 1 a 5 estrellas y dejar comentarios. Las calificaciones muestran el usuario que las realizó y la película calificada.",
            usuarios: "El sistema incluye registro e inicio de sesión de usuarios con autenticación JWT. Los usuarios pueden acceder a su perfil, gestionar películas, géneros y calificaciones.",
            chat: "La aplicación cuenta con un chat en tiempo real implementado con Socket.io que permite a los usuarios comunicarse entre sí.",
            tecnologias: "La aplicación está construida con Node.js, Express, MongoDB (con Mongoose), EJS para las vistas, Socket.io para comunicación en tiempo real, y JWT para autenticación."
        };
        
        // Palabras clave para identificar preguntas
        this.keywords = {
            sistema: ["sistema", "aplicación", "app", "web", "funciona", "hace", "qué es"],
            peliculas: ["película", "películas", "film", "films", "movie", "movies"],
            generos: ["género", "géneros", "categoría", "categorías", "tipo", "tipos"],
            calificaciones: ["calificación", "calificaciones", "rating", "ratings", "puntuación", "estrellas", "valoración"],
            usuarios: ["usuario", "usuarios", "user", "users", "cuenta", "perfil", "login", "registro", "autenticación"],
            chat: ["chat", "mensaje", "mensajes", "comunicación", "hablar", "conversación"],
            tecnologias: ["tecnología", "tecnologías", "stack", "framework", "lenguaje", "base de datos", "mongodb", "node", "express", "socket"]
        };
        
        // Saludos y respuestas genéricas
        this.greetings = ["hola", "buenos días", "buenas tardes", "buenas noches", "saludos"];
        this.greetingResponses = [
            "¡Hola! Soy el asistente virtual del sistema. ¿En qué puedo ayudarte?",
            "¡Bienvenido! Estoy aquí para responder tus preguntas sobre el sistema. ¿Qué necesitas saber?",
            "¡Hola! Soy la IA del sistema. Puedo ayudarte con información sobre películas, géneros, calificaciones y más."
        ];
        
        // Respuestas cuando no se entiende la pregunta
        this.fallbackResponses = [
            "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?",
            "No estoy seguro de lo que preguntas. Puedo hablar sobre el sistema, películas, géneros, calificaciones, usuarios o tecnologías.",
            "Disculpa, no tengo información sobre eso. ¿Hay algo más en lo que pueda ayudarte?"
        ];
    }
    
    /**
     * Procesa un mensaje y genera una respuesta inteligente
     * @param {string} message - Mensaje del usuario
     * @returns {string} - Respuesta del asistente virtual
     */
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Verificar si es un saludo
        if (this.isGreeting(lowerMessage)) {
            return this.getRandomResponse(this.greetingResponses);
        }
        
        // Buscar palabras clave en el mensaje
        const topic = this.identifyTopic(lowerMessage);
        
        if (topic) {
            return this.knowledgeBase[topic];
        }
        
        // Si no se identifica ningún tema, devolver una respuesta genérica
        return this.getRandomResponse(this.fallbackResponses);
    }
    
    /**
     * Verifica si el mensaje es un saludo
     * @param {string} message - Mensaje del usuario en minúsculas
     * @returns {boolean} - True si es un saludo, false en caso contrario
     */
    isGreeting(message) {
        return this.greetings.some(greeting => message.includes(greeting));
    }
    
    /**
     * Identifica el tema del mensaje basado en palabras clave
     * @param {string} message - Mensaje del usuario en minúsculas
     * @returns {string|null} - Tema identificado o null si no se identifica ninguno
     */
    identifyTopic(message) {
        // Verificar si el mensaje contiene preguntas sobre el sistema
        for (const [topic, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return topic;
            }
        }
        
        return null;
    }
    
    /**
     * Obtiene una respuesta aleatoria de un array de respuestas
     * @param {Array} responses - Array de posibles respuestas
     * @returns {string} - Respuesta aleatoria
     */
    getRandomResponse(responses) {
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }
}

module.exports = AIChatService;
