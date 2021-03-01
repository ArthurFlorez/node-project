const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function(req, res) {

    const filtroInstitucion = req.query.institucion || null
    controller.getInstituciones( filtroInstitucion )
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error inesperado', 500, error)
        })
})

router.post('/', function(req, res) {
    controller.addInstitucion(req.body.nombre, req.body.domicilio, req.body.telefono, req.body.tipo_institucion, req.body.id_representante_legal)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 400, 'Error en controlador.')
        })
})

router.patch('/:id', function(req, res) {
    controller.updateInstitucion(req.params.id, req.body.nombre, req.body.domicilio, req.body.telefono, req.body.tipo_institucion, req.body.id_representante_legal)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

router.delete('/:id', function(req, res) {
    controller.deleteInstitucion(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

module.exports = router