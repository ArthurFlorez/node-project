const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function(req, res) {

    const filtroUsuario = req.query.usuario || null
    controller.getUsuarios( filtroUsuario )
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error inesperado', 500, error)
        })
})

router.post('/', function(req, res) {
    controller.addUsuario(req.body.usuario, req.body.clave, req.body.nombre, req.body.apellido, req.body.correo, req.body.tipo_usuario, req.body.carrera, req.body.fecha_nacimiento)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 400, 'Error en controlador.')
        })
})

router.patch('/:id', function(req, res) {
    controller.updateUsuario(req.params.id, req.body.usuario, req.body.clave, req.body.nombre, req.body.apellido, req.body.correo, req.body.tipo_usuario, req.body.carrera, req.body.fecha_nacimiento)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

router.delete('/:id', function(req, res) {
    controller.deleteUsuario(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

module.exports = router