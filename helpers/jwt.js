const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name, summoner, tagline, tags, tutorialcheck, server, title, imguser, textuser, perceptionuser, characteruser, lines, networks, recommendation, suminfo, rank, champmastery, elocolor ) => {

    return new Promise( ( resolve, reject )  => {

        const payload = { uid, name, summoner, tagline, tags, tutorialcheck, server, title, imguser, textuser, perceptionuser, characteruser, lines, networks, recommendation, suminfo, rank, champmastery, elocolor  };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {

            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })

    })
}



module.exports = {
    generarJWT
}