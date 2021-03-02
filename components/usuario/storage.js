const db = require('mongoose')
const Model = require('./model')

// const uri = "mongodb+srv://ups:12345@cluster0.pjyad.gcp.mongodb.net/ups?retryWrites=true&w=majority";
const uri = "mongodb+srv://sa:ups12345@cluster0.g1uoc.mongodb.net/ups?retryWrites=true&w=majority"

db.Promise = global.Promise
db.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'ups'
})
    .then(() => console.log('[db] Conectada con éxito, modelo usuario'))
    .catch((error) => console.error('[error] ', error))

function addUsuario( usuario ) {
    const objeto = new Model( usuario )
    objeto.save()
}

function getUsuarios( filtroUsuario ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtroUsuario != null) {
            filtro = { usuario: filtroUsuario }
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

async function updateUsuario(id_usuario, usuario) {
    const foundUsuario = await Model.findOne({ _id: id_usuario })

    if (foundUsuario) {
        foundUsuario.usuario = usuario.usuario
        foundUsuario.clave = usuario.clave
        foundUsuario.nombre = usuario.nombre
        foundUsuario.apellido = usuario.apellido
        foundUsuario.correo = usuario.correo
        foundUsuario.tipo_usuario = usuario.tipo_usuario
        foundUsuario.fecha_nacimiento = usuario.fecha_nacimiento
        
        const newUsuario = await foundUsuario.save()
        return newUsuario
    }
}

function deleteUsuario(id_usuario) {
    return Model.deleteOne({ _id: id_usuario })
}

module.exports = {
    add: addUsuario,
    list: getUsuarios,
    update: updateUsuario,
    remove: deleteUsuario,
}