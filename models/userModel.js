const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    nombre:String,
    apellido:String,
    email:{type: String, unique: true, required: true},
    telefono:String,
    password:{type: String, required: true},
    role:{type: String, default: 'user'}
})
const User=mongoose.model('User',userSchema)
module.exports=User
