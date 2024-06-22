
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');


const router = Router();

const { crearUsuario, loginUsuario, revalidarToken, actualizarUsuario } = require('../controllers/auth')

router.post(
    '/new',
    [
        check('name','Colocar nombre').not().isEmpty(),
        check('email','Colocar email').isEmail(),
        check('password','El password debe ser de minimo 6 caracteres').isLength({min: 6}),
        check('summoner','El nombre de invocador es obligatorio').not().isEmpty(),
        check('tagline','El nombre de invocador es obligatorio').not().isEmpty(),
        check('server','El server es obligatorio').not().isEmpty(),
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('imguser','La Url de la imagen es obligatoria').not().isEmpty(),
        check('textuser','El texto es obligatorio').not().isEmpty(),
        check('perceptionuser','Tu percepcion es obligatorio').not().isEmpty(),
        check('characteruser','El caracter es obligatorio').not().isEmpty(),
        check('lines','El caracter es obligatorio').not().isEmpty(),
        check('networks','Las redes son obligatorias'),
        check('recommendation','Las recomendaciones son obligatorias'),
        check('suminfo','La sum info es obligatoria'),
        check('rank','El rank es obligatorio'),
        check('champmastery','El champmastery es obligatorio'),
        check('elocolor','El champmastery es obligatorio'),
        fieldValidator
    ],
    crearUsuario
);

router.put( 
    '/:id',
    [
        // check('name','Colocar nombre').not().isEmpty(),
        // check('email','Colocar email').isEmail(),
        // check('password','El password debe ser de minimo 6 caracteres').isLength({min: 6}),
        // check('summoner','El nombre de invocador es obligatorio').not().isEmpty(),
        // check('server','El server es obligatorio').not().isEmpty(),
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('imguser','La Url de la imagen es obligatoria').not().isEmpty(),
        check('textuser','El texto es obligatorio').not().isEmpty(),
        check('perceptionuser','Tu percepcion es obligatorio').not().isEmpty(),
        check('characteruser','El caracter es obligatorio').not().isEmpty(),
        check('lines','El caracter es obligatorio').not().isEmpty(),
        check('networks','Las redes son obligatorias'),
        check('recommendation','Las recomendaciones son obligatorias'),
        check('suminfo','La sum info es obligatoria'),
        check('rank','El rank es obligatorio'),
        check('champmastery','El champmastery es obligatorio'),
        check('elocolor','El champmastery es obligatorio'),
        fieldValidator
    ],  
    actualizarUsuario );

router.post(
    '/',
    [
        check('email','Colocar email').isEmail(),
        check('password','El password debe ser de minimo 6 caracteres').isLength({min: 6})
    ],
    loginUsuario
);

router.get( '/renew', jwtValidator, revalidarToken );

module.exports = router;