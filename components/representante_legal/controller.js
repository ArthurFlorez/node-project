const use = require('./network')
const storage = require('./storage')

function addRepresentanteLegal(cedula, nombre, apellido, correo_electronico, telefono) {
    return new Promise( (resolve, reject) => {
        if (!cedula) {
            console.error('[MensajeControlado] No hay representante legal.')
            return reject('No existe representante legal.')
        }
        // Se crea un objeto representante
        const fullRepresentanteLegal = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            correo_electronico: correo_electronico,
            telefono: telefono,
            fecha_creacion: new Date(),
        }
        console.log( fullRepresentanteLegal )
        storage.add( fullRepresentanteLegal )
        return resolve( fullRepresentanteLegal )
    })
}

function updateRepresentanteLegal(id_representante_legal, cedula, nombre, apellido, correo_electronico, telefono) {
    return new Promise( async (resolve, reject) => {
        if (!id_representante_legal) {
            reject(  'No existe ID del representante legal.' )
        }
        const fullRepresentanteLegal = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            correo_electronico: correo_electronico,
            telefono: telefono,
        }
        const result = await storage.update( id_representante_legal, fullRepresentanteLegal )
        resolve( result )
    } )
}

function getRepresentantesLegales( filtroRepresentanteLegal ) {
    return new Promise((resolve, reject) => {
        resolve( storage.list( filtroRepresentanteLegal ) )
    })
}

function deleteRepresentanteLegal(id_representante_legal) {
    return new Promise( (resolve, reject) => {
        if (!id_representante_legal) {
            reject('No existe el representante legal.')
        }
        storage.remove(id_representante_legal)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    } )
}

module.exports = {
    addRepresentanteLegal,
    getRepresentantesLegales,
    updateRepresentanteLegal,
    deleteRepresentanteLegal,
}