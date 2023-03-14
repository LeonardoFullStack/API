
const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt')

/* const getUser = async (req, res) => {
    const userName = req.body.nombre

    try {
        const usuario = await Usuario.find({ nombre: userName })

        return res.status(200).json({
            ok: true,
            msg: 'Obteniendo el usuario',
            data: usuario
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }

} */




const crearUsuario = async (req, res) => {



    try {
        const usuario = await Usuario.findOne({ email: req.body.email })

        if (usuario == null) {
            const nuevoUsuario = new Usuario(req.body)
            const nuevoUsuarioData = await nuevoUsuario.save()
            //encriptar pass
            const token = await generarJwt(usuario.id,usuario.name)
            return res.status(201).json({
                ok: true,
                msg: 'Creando el usuario',
                data: nuevoUsuarioData
            })
        }else error

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido crear el usuario'
        })
    }


}

const loginUser =async (req, res) => {

    try {
        const usuario = await Usuario.findOne({ email: req.body.email });

        if (usuario ==null) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            })

        } else if (usuario.pass != req.body.pass) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o usuario incorrectos',
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: 'Accediendo a la base  de datos',
                data: usuario
            })
        }

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUser
}