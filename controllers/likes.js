const { response } = require('express');
const Likes = require('../models/Likes');
const { generarJWT } = require('../helpers/jwt');




const getLikes = async(req,res = response ) => {

        const likes = await Likes.find()
                                    .populate('user');

        res.status(201).json({
            ok: true,
            likes
    })

    
};



const crearLikes = async(req,res = response ) => {

        const likes = new Likes( req.body )

        try {

            likes.user = req.uid;
            
            const likesGuardado = await likes.save()

            res.status(201).json({
                ok: true,
                likes: likesGuardado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarLikes = async(req,res = response ) => {

        const likesId = req.params.id;
        const uid = req.uid;

        try {
            
            const likes = await Likes.findById( likesId );

            if ( !likes ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El comentario no existe con ese id'
                })
            }

            // MODIFICAR ESTO PARA ACTUALIZAR THREAD COMENTARIOS
            // if ( comment.user.toString() !== uid ) {
            //     return res.status(401).json({
            //         ok: false,
            //         msg: "No tiene permiso para editar este comentario"
            //     })
            // }

            const nuevoLikes = {
                ...req.body,
                user: likes.user
            }

            const likesActualizado = await Likes.findByIdAndUpdate( likesId, nuevoLikes, { new: true } );

            res.status(201).json({
                ok: true,
                likes: likesActualizado
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarLikes = async(req,res = response ) => {

    const likesId = req.params.id;
    const uid = req.uid;

    try {
        
        const likes = await Likes.findById( likesId );

        if ( !likes ) {
            return res.status(404).json({
                ok: false,
                msg: 'El like no existe con ese id'
            })
        }

        if ( likes.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este comentario"
            })
        }


        await Likes.findByIdAndDelete(likesId)

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
    getLikes,
    crearLikes,
    actualizarLikes,
    eliminarLikes
 }