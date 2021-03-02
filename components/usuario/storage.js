const Model = require('./model')

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