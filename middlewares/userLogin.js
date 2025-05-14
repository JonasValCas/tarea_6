const userLogin = (req, res, next) => {
    // Permitir acceso a todas las rutas públicas
    const publicRoutes = [
        '/',
        '/auth/login',
        '/auth/register',
        '/auth/login',
        '/auth/register'
    ];
    
    // Si es una ruta pública o una solicitud de API de autenticación, permitir acceso
    if (publicRoutes.includes(req.path) || 
        req.path.startsWith('/socket.io') || 
        req.path.startsWith('/public') ||
        (req.path === '/auth/login' && req.method === 'POST') ||
        (req.path === '/auth/register' && req.method === 'POST')) {
        return next();
    }
    
    // Para las demás rutas, se manejará la autenticación en los controladores específicos
    // o mediante el middleware verifyToken para las rutas protegidas de la API
    next();
}

module.exports = userLogin