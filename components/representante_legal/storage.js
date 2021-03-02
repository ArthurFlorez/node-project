const db = require('mongoose')
const Model = require('./model')

const uri = "mongodb+srv://sa:ups12345@cluster0.g1uoc.mongodb.net/ups?retryWrites=true&w=majority"

db.Promise = global.Promise
db.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'ups'
})
    .then(() => console.log('[db] Conectada con éxito, modelo representante_legal'))
    .catch((error) => console.error('[error] ', error))

function addRepresentanteLegal( representante_legal ) {
    const objeto = new Model( representante_legal )
    objeto.save()
}

function getRepresentantesLegales( filtroRepresentanteLegal ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtroRepresentanteLegal != null) {
            filtro = { usuario: filtroRepresentanteLegal }
        }
        Model.find( filtro )
            .populate( 'carrera' )
            .exec( (error, populated) => {
                if (error) {
                    reject( error )
                    return false
                }
                resolve( populated )
            } )
    })
}

async function updateRepresentanteLegal(id_representante_legal, representante_legal) {
    const foundRepresentanteLegal = await Model.findOne({ _id: id_representante_legal })

    if (foundRepresentanteLegal) {
        foundRepresentanteLegal.cedula = representante_legal.cedula
        foundRepresentanteLegal.nombre = representante_legal.nombre
        foundRepresentanteLegal.apellido = representante_legal.apellido
        foundRepresentanteLegal.correo_electronico = representante_legal.correo_electronico
        foundRepresentanteLegal.telefono = representante_legal.telefono
        
        const newRepresentanteLegal = await foundRepresentanteLegal.save()
        return newRepresentanteLegal
    }
}

function deleteRepresentanteLegal(id_representante_legal) {
    return Model.deleteOne({ _id: id_representante_legal })
}

module.exports = {
    add: addRepresentanteLegal,
    list: getRepresentantesLegales,
    update: updateRepresentanteLegal,
    remove: deleteRepresentanteLegal,
}