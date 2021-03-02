const Model = require('./model')

function addCarrera( carrera ) {
    const objeto = new Model( carrera )
    objeto.save()
}

async function getCarreras() {
    const objetos = await Model.find()
    return objetos
}

module.exports = {
    add: addCarrera,
    list: getCarreras,
}