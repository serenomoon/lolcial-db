const { response } = require('express');
const Post = require('../models/Post');
const { generarJWT } = require('../helpers/jwt');




const getPosts = async(req,res = response ) => {

        const posts = await Post.find()
                                    .populate('user');

        res.status(201).json({
            ok: true,
            posts
    })

    
};



const crearPost = async(req,res = response ) => {

        const post = new Post( req.body )

        try {

            post.user = req.uid;
            
            const postGuardado = await post.save()

            res.status(201).json({
                ok: true,
                post: postGuardado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarPost = async(req,res = response ) => {

        const postId = req.params.id;
        const uid = req.uid;

        try {
            
            const post = await Post.findById( postId );

            if ( !post ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Post no existe con ese id'
                })
            }

            if ( post.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para editar este post"
                })
            }

            const nuevoPost = {
                ...req.body,
                user: uid
            }

            const postActualizado = await Post.findByIdAndUpdate( postId, nuevoPost, { new: true } );

            res.status(201).json({
                ok: true,
                post: postActualizado
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarPost = async(req,res = response ) => {

    const postId = req.params.id;
    const uid = req.uid;

    try {
        
        const post = await Post.findById( postId );

        if ( !post ) {
            return res.status(404).json({
                ok: false,
                msg: 'Post no existe con ese id'
            })
        }

        if ( post.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este post"
            })
        }


        await Post.findByIdAndDelete(postId)

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
    getPosts,
    crearPost,
    actualizarPost,
    eliminarPost
 }