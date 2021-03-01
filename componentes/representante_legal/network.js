const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function(req, res) {

    const filtroRepresentanteLegal = req.query.representante_legal || null
    controller.getRepresentantesLegales( filtroRepresentanteLegal )
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error inesperado', 500, error)
        })
})

router.post('/', function(req, res) {
    controller.addRepresentanteLegal(req.body.cedula, req.body.nombre, req.body.apellido, req.body.correo_electronico, req.body.telefono)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 400, 'Error en controlador.')
        })
})

router.patch('/:id', function(req, res) {
    controller.updateRepresentanteLegal(req.params.id, req.body.cedula, req.body.nombre, req.body.apellido, req.body.correo_electronico, req.body.telefono)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

router.delete('/:id', function(req, res) {
    controller.deleteRepresentanteLegal(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

module.exports = router