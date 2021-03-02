const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    fecha_creacion: Date,
})

const model = mongoose.model('Carrera', mySchema)
module.exports = model