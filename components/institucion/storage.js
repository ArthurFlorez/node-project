const Model = require('./model')

function addInstitucion( institucion ) {
    const objeto = new Model( institucion )
    objeto.save()
}

function getInstituciones( filtroInstitucion ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtroInstitucion != null) {
            filtro = { usuario: filtroInstitucion }
        }
        Model.find( filtro )
            .populate('representante_legal')
            .exec( (error, populated) => {
                if (error) {
                    reject( error )
                    return false
                }
                resolve( populated )
            } )
    })
}

async function updateInstitucion(id_institucion, institucion) {
    const foundInstitucion = await Model.findOne({ _id: id_institucion })

    if (foundInstitucion) {
        foundInstitucion.nombre = institucion.nombre
        foundInstitucion.domicilio = institucion.domicilio
        foundInstitucion.telefono = institucion.telefono
        foundInstitucion.tipo_institucion = institucion.tipo_institucion
        foundInstitucion.representante_legal = institucion.representante_legal
        
        const newInstitucion = await foundInstitucion.save()
        return newInstitucion
    }
}

function deleteInstitucion(id_institucion) {
    return Model.deleteOne({ _id: id_institucion })
}

module.exports = {
    add: addInstitucion,
    list: getInstituciones,
    update: updateInstitucion,
    remove: deleteInstitucion,
}