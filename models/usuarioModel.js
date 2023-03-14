const {model, Schema} = require('mongoose')

const UsuarioSchema = new Schema  ({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    }
})

module.exports=model('Usuario',UsuarioSchema)