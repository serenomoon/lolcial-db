const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {

    const { email, password, summoner ,server ,title ,imguser ,textuser ,perceptionuser ,characteruser, lines ,networks ,recommendation, suminfo, rank, champmastery, elocolor } = req.body;

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



const revalidarToken = async(req, res = response) => {

    const { 
        name, 
        uid,
        summoner,
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
    revalidarToken
 }