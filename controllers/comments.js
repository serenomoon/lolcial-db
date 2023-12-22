const { response } = require('express');
const Comment = require('../models/Comment');
const { generarJWT } = require('../helpers/jwt');




const getComments = async(req,res = response ) => {

        const comments = await Comment.find()
                                    .populate('user');

        res.status(201).json({
            ok: true,
            comments
    })

    
};



const crearComment = async(req,res = response ) => {

        const comment = new Comment( req.body )
        console.log(comment)

        try {

            comment.user = req.uid;
            
            const commentGuardado = await comment.save()

            res.status(201).json({
                ok: true,
                comment: commentGuardado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarComment = async(req,res = response ) => {

        const commentId = req.params.id;
        const uid = req.uid;

        try {
            
            const comment = await Comment.findById( commentId );

            if ( !comment ) {
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

            const nuevoComment = {
                ...req.body,
                user: comment.user
            }

            const commentActualizado = await Comment.findByIdAndUpdate( commentId, nuevoComment, { new: true } );

            res.status(201).json({
                ok: true,
                comment: commentActualizado
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarComment = async(req,res = response ) => {

    const commentId = req.params.id;
    const uid = req.uid;

    try {
        
        const comment = await Comment.findById( commentId );

        if ( !comment ) {
            return res.status(404).json({
                ok: false,
                msg: 'El comentario no existe con ese id'
            })
        }

        if ( comment.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este comentario"
            })
        }


        await Comment.findByIdAndDelete(commentId)

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
    getComments,
    crearComment,
    actualizarComment,
    eliminarComment
 }