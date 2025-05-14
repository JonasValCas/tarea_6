const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const userLogin = require('./middlewares/userLogin');
const connection = require('./database/connection');
const socket = require('socket.io');
// Routers
const userRouter = require('./routers/userRouters');
const movieRouter = require('./routers/movieRouter');
const genreRouter = require('./routers/genreRouter');
const ratingRouter = require('./routers/ratingRouter');
const authRouter = require('./routers/authRouters');
const dashboardRouter = require('./routers/dashboardRouters');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(userLogin);

// Vistas con EJS
app.use(express.static(__dirname+ '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta principal
app.get('/', (req, res) => {
    const data = {
        title: "Titulo de la página",
        message: "Que bonita pagina",
        showMessage: true,
        items: [1, 2, 3, 4, 5, 6]
    };
    res.render('index', data);
});

// Rutas de API
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);
app.use('/ratings', ratingRouter);

const server = require('http').createServer(app);
const io = socket(server);
require('./socket')(io);


// Servidor
server.listen(3000, () => {
    console.log('Aplicación con Express ejecutándose en el puerto 3000');
});