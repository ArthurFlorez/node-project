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
    .then(() => console.log('[db] Conectada con éxito, modelo carrera'))
    .catch((error) => console.error('[error] ', error))

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