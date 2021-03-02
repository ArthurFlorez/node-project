const use = require('./network')
const storage = require('./storage')

function addCarrera(nombre) {
    return new Promise( (resolve, reject) => {
        if (!nombre) {
            console.error('[MensajeControlado] No hay nombre de Carrera.')
            return reject('No existe Carrera.')
        }
        // Se crea un objeto Carrera
        const fullCarrera = {
            nombre: nombre,
            fecha_creacion: new Date(),
        }
        console.log( fullCarrera )
        storage.add( fullCarrera )
        return resolve( fullCarrera )
    })
}

function getCarreras() {
    return new Promise((resolve, reject) => {
        resolve( storage.list() )
    })
}

module.exports = {
    addCarrera,
    getCarreras,
}