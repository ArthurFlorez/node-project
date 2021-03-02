const use = require('./network')
const storage = require('./storage')

function addUsuario(usuario, clave, nombre, apellido, correo, tipo_usuario, id_carrera, fecha_nacimiento) {
    return new Promise( (resolve, reject) => {
        if (!usuario) {
            console.error('[MensajeControlado] No hay usuario.')
            return reject('No existe usuario.')
        }
        // Se crea un objeto usuario
        const fullUsuario = {
            usuario: usuario,
            clave: clave,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            tipo_usuario: tipo_usuario,
            carrera: id_carrera,
            fecha_creacion: new Date(),
            fecha_nacimiento: fecha_nacimiento,
        }
        console.log( fullUsuario )
        storage.add( fullUsuario )
        return resolve( fullUsuario )
    })
}

function updateUsuario(id_usuario, usuario, clave, nombre, apellido, correo, tipo_usuario, fecha_nacimiento) {
    return new Promise( async (resolve, reject) => {
        if (!id_usuario) {
            reject(  'No existe ID.' )
        }
        const fullUsuario = {
            usuario: usuario,
            clave: clave,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            carrera: id_carrera,
            tipo_usuario: tipo_usuario,
            fecha_nacimiento: fecha_nacimiento,
        }
        const result = await storage.update( id_usuario, fullUsuario )
        resolve( result )
    } )
}

function getUsuarios( filtroUsuario ) {
    return new Promise((resolve, reject) => {
        resolve( storage.list( filtroUsuario ) )
    })
}

function deleteUsuario(id_usuario) {
    return new Promise( (resolve, reject) => {
        if (!id_usuario) {
            reject('No existe usuario.')
        }
        storage.remove(id_usuario)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    } )
}

module.exports = {
    addUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
}