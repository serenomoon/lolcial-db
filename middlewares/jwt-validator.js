const { response } = require('express');
const jwt = require('jsonwebtoken');


const jwtValidator = ( req, res = response, next) => {

    // x-token headers
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid, name,summoner, server, title, imguser, textuser, perceptionuser, characteruser, lines, networks, recommendation, suminfo, rank, champmastery, elocolor  } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        req.summoner = summoner; 
        req.server = server;
        req.title = title;
        req.imguser = imguser; 
        req.textuser = textuser;
        req.perceptionuser = perceptionuser; 
        req.characteruser = characteruser;
        req.lines = lines;
        req.networks = networks;
        req.recommendation = recommendation;
        req.suminfo = suminfo; 
        req.rank = rank;
        req.champmastery = champmastery;
        req.elocolor = elocolor;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    

    next();

}


module.exports = {
    jwtValidator
}