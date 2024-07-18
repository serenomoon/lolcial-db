const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {

    const { email, password, summoner, tagline, tags, tutorialcheck ,server ,title ,imguser ,textuser ,perceptionuser ,characteruser, lines ,networks ,recommendation, suminfo, rank, champmastery, elocolor } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        
        usuario = new Usuario( req.body )

        // Encriptar pass
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //generar JWT
        const token = await generarJWT( 
            usuario.id, 
            usuario.name, 
            usuario.summoner,
            usuario.tagline,
            usuario.tags,
            usuario.tutorialcheck,
            usuario.server,
            usuario.title,
            usuario.imguser,
            usuario.textuser,
            usuario.perceptionuser,
            usuario.characteruser,
            usuario.lines,
            usuario.networks,
            usuario.recommendation,
            usuario.suminfo,
            usuario.rank,
            usuario.champmastery,
            usuario.elocolor
             );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            summoner: usuario.summoner,
            tagline: usuario.tagline,
            tags: usuario.tags,
            tutorialcheck: usuario.tutorialcheck,
            server: usuario.server,
            title: usuario.title,
            imguser: usuario.imguser,
            textuser: usuario.textuser,
            perceptionuser: usuario.perceptionuser,
            characteruser: usuario.characteruser,
            lines: usuario.lines,
            networks: usuario.networks,
            recommendation: usuario.recommendation,
            suminfo: usuario.suminfo,
            rank: usuario.rank,
            champmastery: usuario.champmastery,
            elocolor: usuario.elocolor,
            token
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }
    
};



const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }
        //confirmar pass
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }


        // Generar JWT
        const token = await generarJWT( 
            usuario.id, 
            usuario.name, 
            usuario.summoner,
            usuario.tagline,
            usuario.tags,
            usuario.tutorialcheck,
            usuario.server,
            usuario.title,
            usuario.imguser,
            usuario.textuser,
            usuario.perceptionuser,
            usuario.characteruser,
            usuario.lines,
            usuario.networks,
            usuario.recommendation,
            usuario.suminfo,
            usuario.rank,
            usuario.champmastery,
            usuario.elocolor
            );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            summoner: usuario.summoner,
            tagline: usuario.tagline,
            tags: usuario.tags,
            tutorialcheck: usuario.tutorialcheck,
            server: usuario.server,
            title: usuario.title,
            imguser: usuario.imguser,
            textuser: usuario.textuser,
            perceptionuser: usuario.perceptionuser,
            characteruser: usuario.characteruser,
            lines: usuario.lines,
            networks: usuario.networks,
            recommendation: usuario.recommendation,
            suminfo: usuario.suminfo,
            rank: usuario.rank,
            champmastery: usuario.champmastery,
            elocolor: usuario.elocolor,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }

};


const actualizarUsuario = async(req,res = response ) => {

    const usuarioId = req.params.id;
    const uid = req.uid;

    try {
        
        const usuario = await Usuario.findById( usuarioId );

        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe con ese id'
            })
        }

        // if ( usuario.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: "No tiene permiso para editar esta noticia"
        //     })
        // }

        const nuevoUsuario = {
            ...req.body,
            user: uid
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( usuarioId, nuevoUsuario, { new: true } );

         // Generar JWT
         const token = await generarJWT( 
            usuarioActualizado.id, 
            usuarioActualizado.name, 
            usuarioActualizado.summoner,
            usuarioActualizado.tagline,
            usuarioActualizado.tutorialcheck,
            usuarioActualizado.tags,
            usuarioActualizado.server,
            usuarioActualizado.title,
            usuarioActualizado.imguser,
            usuarioActualizado.textuser,
            usuarioActualizado.perceptionuser,
            usuarioActualizado.characteruser,
            usuarioActualizado.lines,
            usuarioActualizado.networks,
            usuarioActualizado.recommendation,
            usuarioActualizado.suminfo,
            usuarioActualizado.rank,
            usuarioActualizado.champmastery,
            usuarioActualizado.elocolor
            );

        res.json({
            ok: true,
            uid: usuarioActualizado.id,
            name: usuarioActualizado.name,
            summoner: usuarioActualizado.summoner,
            tagline: usuarioActualizado.tagline,
            tutorialcheck: usuarioActualizado.tutorialcheck,
            tags: usuarioActualizado.tags,
            server: usuarioActualizado.server,
            title: usuarioActualizado.title,
            imguser: usuarioActualizado.imguser,
            textuser: usuarioActualizado.textuser,
            perceptionuser: usuarioActualizado.perceptionuser,
            characteruser: usuarioActualizado.characteruser,
            lines: usuarioActualizado.lines,
            networks: usuarioActualizado.networks,
            recommendation: usuarioActualizado.recommendation,
            suminfo: usuarioActualizado.suminfo,
            rank: usuarioActualizado.rank,
            champmastery: usuarioActualizado.champmastery,
            elocolor: usuarioActualizado.elocolor,
            token
        })
        // res.status(201).json({
        //     ok: true,
        //     perfil: usuarioActualizado,
        //     token
        // });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })

    }
};



const revalidarToken = async(req, res = response) => {

    const { 
        name, 
        uid,
        summoner,
        tagline,
        tags,
        tutorialcheck,
        server,
        title,
        imguser,
        textuser,
        perceptionuser,
        characteruser,
        lines,
        networks,
        recommendation,
        suminfo,
        rank,
        champmastery,
        elocolor 
    } = req

    // Generar JWT
    const token = await generarJWT( 
        uid,
        name,
        summoner,
        tagline,
        tags,
        tutorialcheck,
        server,
        title,
        imguser,
        textuser,
        perceptionuser,
        characteruser,
        lines,
        networks,
        recommendation,
        suminfo,
        rank,
        champmastery,
        elocolor 
        );

    res.json({
        ok: true,
        uid, 
        name,
        summoner,
        tagline,
        tags,
        tutorialcheck,
        server,
        title,
        imguser,
        textuser,
        perceptionuser,
        characteruser,
        lines,
        networks,
        recommendation,
        suminfo,
        rank,
        champmastery,
        elocolor, 
        token
    })

}



module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken,
    actualizarUsuario
 }