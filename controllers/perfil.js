const { response } = require('express');
const Perfil = require('../models/Perfil');
// const { generarJWT } = require('../helpers/jwt');




const getPerfil = async(req,res = response ) => {

        const perfil = await Perfil.find()
                                    .populate('user','name');

        res.status(201).json({
            ok: true,
            perfil
    })

    
};



const crearPerfil = async(req,res = response ) => {

        const perfil = new Perfil( req.body )

        try {

            perfil.user = req.uid;
            
            const perfilGuardada = await perfil.save()

            res.status(201).json({
                ok: true,
                perfil: perfilGuardada
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarPerfil = async(req,res = response ) => {

        const perfilId = req.params.id;
        const uid = req.uid;

        try {
            
            const perfil = await Perfil.findById( perfilId );

            if ( !perfil ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Perfil no existe con ese id'
                })
            }

            if ( perfil.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para editar esta noticia"
                })
            }

            const nuevoPerfil = {
                ...req.body,
                user: uid
            }

            const perfilActualizado = await Perfil.findByIdAndUpdate( perfilId, nuevoPerfil, { new: true } );

            res.status(201).json({
                ok: true,
                perfil: perfilActualizado
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarPerfil = async(req,res = response ) => {

    const perfilId = req.params.id;
    const uid = req.uid;

    try {
        
        const perfil = await Perfil.findById( perfilId );

        if ( !perfil ) {
            return res.status(404).json({
                ok: false,
                msg: 'Perfil no existe con ese id'
            })
        }

        if ( perfil.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este perfil"
            })
        }


        await Perfil.findByIdAndDelete(perfilId)

        res.status(201).json({ ok: true });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })

    }
    
};



module.exports = { 
    getPerfil,
    crearPerfil,
    actualizarPerfil,
    eliminarPerfil
 }