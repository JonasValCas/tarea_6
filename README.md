# Sistema de Gestiu00f3n de Pelu00edculas

Este proyecto es una aplicaciu00f3n Node.js con Express que incluye:

1. Sistema de autenticaciu00f3n con registro e inicio de sesiu00f3n usando JWT
2. Chat en tiempo real con Socket.io
3. Estructura MVC (Modelo-Vista-Controlador)
4. Base de datos MongoDB con Mongoose
5. Vistas con EJS
6. Middleware de autenticaciu00f3n para proteger rutas
7. API RESTful para usuarios, pelu00edculas, gu00e9neros y calificaciones

## Estructura del Proyecto

```
/
u251cu2500u2500 app.js                # Archivo principal de la aplicaciu00f3n
u251cu2500u2500 config.js             # Configuraciu00f3n de la aplicaciu00f3n
u251cu2500u2500 config/               # Configuraciones adicionales
u2502   u2514u2500u2500 auth.js          # Configuraciu00f3n de autenticaciu00f3n JWT
u251cu2500u2500 controllers/          # Controladores de la aplicaciu00f3n
u2502   u251cu2500u2500 authController.js  # Controlador de autenticaciu00f3n
u2502   u251cu2500u2500 dashboardController.js # Controlador del dashboard
u2502   u251cu2500u2500 genreController.js # Controlador de gu00e9neros
u2502   u251cu2500u2500 movieController.js # Controlador de pelu00edculas
u2502   u251cu2500u2500 ratingController.js # Controlador de calificaciones
u2502   u2514u2500u2500 userController.js  # Controlador de usuarios
u251cu2500u2500 database/             # Configuraciu00f3n de la base de datos
u2502   u2514u2500u2500 connection.js     # Conexiu00f3n a MongoDB
u251cu2500u2500 middlewares/          # Middlewares de la aplicaciu00f3n
u2502   u251cu2500u2500 authJwt.js        # Middleware de autenticaciu00f3n JWT
u2502   u2514u2500u2500 userLogin.js      # Middleware de login de usuario
u251cu2500u2500 models/               # Modelos de la base de datos
u2502   u251cu2500u2500 genreModel.js      # Modelo de gu00e9nero
u2502   u251cu2500u2500 messageModel.js    # Modelo de mensaje para el chat
u2502   u251cu2500u2500 movieModel.js      # Modelo de pelu00edcula
u2502   u251cu2500u2500 ratingModel.js     # Modelo de calificaciu00f3n
u2502   u2514u2500u2500 userModel.js       # Modelo de usuario
u251cu2500u2500 public/               # Archivos estu00e1ticos
u2502   u2514u2500u2500 style.css          # Estilos CSS
u251cu2500u2500 routers/              # Rutas de la aplicaciu00f3n
u2502   u251cu2500u2500 authRouters.js     # Rutas de autenticaciu00f3n
u2502   u251cu2500u2500 dashboardRouters.js # Rutas del dashboard
u2502   u251cu2500u2500 genreRouter.js     # Rutas de gu00e9neros
u2502   u251cu2500u2500 movieRouter.js     # Rutas de pelu00edculas
u2502   u251cu2500u2500 ratingRouter.js    # Rutas de calificaciones
u2502   u2514u2500u2500 userRouters.js     # Rutas de usuarios
u251cu2500u2500 services/             # Servicios de la aplicaciu00f3n
u2502   u251cu2500u2500 genreService.js    # Servicio de gu00e9neros
u2502   u251cu2500u2500 messageService.js  # Servicio de mensajes para el chat
u2502   u251cu2500u2500 movieService.js    # Servicio de pelu00edculas
u2502   u251cu2500u2500 ratingService.js   # Servicio de calificaciones
u2502   u2514u2500u2500 userService.js     # Servicio de usuarios
u251cu2500u2500 socket.js             # Configuraciu00f3n de Socket.io para el chat
u251cu2500u2500 views/                # Vistas de la aplicaciu00f3n
u2502   u251cu2500u2500 auth/              # Vistas de autenticaciu00f3n
u2502   u2502   u251cu2500u2500 login.ejs       # Vista de inicio de sesiu00f3n
u2502   u2502   u251cu2500u2500 profile.ejs     # Vista de perfil de usuario
u2502   u2502   u2514u2500u2500 register.ejs    # Vista de registro
u2502   u251cu2500u2500 dashboard.ejs      # Vista del dashboard principal
u2502   u251cu2500u2500 genres_new.ejs     # Vista de gestiu00f3n de gu00e9neros
u2502   u251cu2500u2500 index.ejs          # Vista principal con chat
u2502   u251cu2500u2500 movies_new.ejs     # Vista de gestiu00f3n de pelu00edculas
u2502   u2514u2500u2500 ratings_new.ejs    # Vista de gestiu00f3n de calificaciones
u2514u2500u2500 package.json          # Dependencias del proyecto
```

## Caracteru00edsticas

### Sistema de Autenticaciu00f3n

- Registro de usuarios
- Inicio de sesiu00f3n con JWT
- Protecciu00f3n de rutas mediante middleware
- Perfil de usuario

### Chat en Tiempo Real

- Implementado con Socket.io
- Mensajes en tiempo real
- Notificaciones de escritura

### Panel de Administraciu00f3n

- Gestiu00f3n de pelu00edculas
- Gestiu00f3n de gu00e9neros
- Gestiu00f3n de calificaciones

## Modelos de Datos

### Usuario

```javascript
const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: {type: String, unique: true, required: true},
    telefono: String,
    password: {type: String, required: true},
    role: {type: String, default: 'user'}
});
```

### Pelu00edcula

```javascript
const movieSchema = new Schema({
    title: String,
    description: String,
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    releaseYear: Number
});
```

### Gu00e9nero

```javascript
const genreSchema = new Schema({
    name: String
});
```

### Calificaciu00f3n

```javascript
const ratingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    score: { type: Number, min: 1, max: 5 },
    comment: String
});
```

## Instalaciu00f3n

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Instala las dependencias de autenticaciu00f3n: `npm install bcrypt jsonwebtoken`
4. Configura la conexiu00f3n a MongoDB en `database/connection.js`
5. Inicia la aplicaciu00f3n: `npm run dev`

## Uso

1. Accede a `http://localhost:3000/auth/register` para registrarte
2. Inicia sesiu00f3n en `http://localhost:3000/auth/login`
3. Seru00e1s redirigido al dashboard donde podru00e1s gestionar pelu00edculas, gu00e9neros y calificaciones
4. Accede al chat en `http://localhost:3000/`

## API Endpoints

### Autenticaciu00f3n

- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesiu00f3n
- `GET /auth/profile-data` - Obtener datos del perfil (protegido)
- `POST /auth/change-password` - Cambiar contraseu00f1a (protegido)

### Usuarios

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario por ID
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario
- `DELETE /users/:id` - Eliminar un usuario

### Pelu00edculas

- `GET /movies` - Obtener todas las pelu00edculas
- `GET /movies/:id` - Obtener una pelu00edcula por ID
- `POST /movies` - Crear una nueva pelu00edcula
- `PUT /movies/:id` - Actualizar una pelu00edcula
- `DELETE /movies/:id` - Eliminar una pelu00edcula

### Gu00e9neros

- `GET /genres` - Obtener todos los gu00e9neros
- `GET /genres/:id` - Obtener un gu00e9nero por ID
- `POST /genres` - Crear un nuevo gu00e9nero
- `PUT /genres/:id` - Actualizar un gu00e9nero
- `DELETE /genres/:id` - Eliminar un gu00e9nero

### Calificaciones

- `GET /ratings` - Obtener todas las calificaciones
- `GET /ratings/:id` - Obtener una calificaciu00f3n por ID
- `POST /ratings` - Crear una nueva calificaciu00f3n
- `PUT /ratings/:id` - Actualizar una calificaciu00f3n
- `DELETE /ratings/:id` - Eliminar una calificaciu00f3n
