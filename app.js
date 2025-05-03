const express=require('express')
const app=express()
const userRouter=require('./routers/userRouters')
const morgan = require('morgan')
const userLogin=require('./middlewares/userLogin')
const path=require('path')
const connection=require('./database/connection')


app.use(express.json())
app.use(morgan('dev'))
app.use(userLogin)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.get('/',(req, res)=>{

    const data={
        "title":"Titulo de la página",
        "message":"Que bonita pagina",
        "showMessage":true,
        "items":[1,2,3,4,5,6]
    }
    res.render('index',data)
})

app.use('/users', userRouter)

app.listen(3000,()=>{
    console.log('Aplicacion con express ejecutandose en el puerto 3000')
})