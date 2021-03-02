const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    usuario: {
        type: String,
        required: true,
    },
    clave: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        required: true,
    },
    tipo_usuario: {
        type: String,
        required: true,
    },
    carrera: {
        type: Schema.ObjectId,
        ref: 'Carrera',
    },
    fecha_nacimiento: Date,
})

const model = mongoose.model('Usuario', mySchema)
module.exports = model