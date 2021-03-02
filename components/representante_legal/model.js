const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    cedula: {
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
    correo_electronico: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        required: true,
    }
})

const model = mongoose.model('Representante_Legal', mySchema)
module.exports = model