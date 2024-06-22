const { Router } = require('express');

// const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getPerfil, crearPerfil, actualizarPerfil, eliminarPerfil } = require('../controllers/perfil');

const router = Router();

router.get( '/', getPerfil );


router.use( jwtValidator )

router.post(
    '/',
    [
        check('summoner','El nombre de invocador es obligatorio').not().isEmpty(),
        check('tagline','El nombre de invocador es obligatorio').not().isEmpty(),
        check('server','El server es obligatorio').not().isEmpty(),
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('imguser','La Url de la imagen es obligatoria').not().isEmpty(),
        check('textuser','El texto es obligatorio').not().isEmpty(),
        check('perceptionuser','Tu percepcion es obligatorio').not().isEmpty(),
        check('characteruser','El caracter es obligatorio').not().isEmpty(),
        check('networks','Las redes son obligatorias').not().isEmpty(),
        check('recommendation','Las recomendaciones son obligatorias').not().isEmpty(),
        fieldValidator
    ], 
    crearPerfil 
);

router.put( 
    '/:id',
    [
        check('summoner','El nombre de invocador es obligatorio').not().isEmpty(),
        check('tagline','El nombre de invocador es obligatorio').not().isEmpty(),
        check('server','El server es obligatorio').not().isEmpty(),
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('imguser','La Url de la imagen es obligatoria').not().isEmpty(),
        check('textuser','El texto es obligatorio').not().isEmpty(),
        check('perceptionuser','Tu percepcion es obligatorio').not().isEmpty(),
        check('characteruser','El caracter es obligatorio').not().isEmpty(),
        check('networks','Las redes son obligatorias').not().isEmpty(),
        check('recommendation','Las recomendaciones son obligatorias').not().isEmpty(),
        fieldValidator
    ],  
    actualizarPerfil );

router.delete( '/:id', eliminarPerfil );

module.exports = router;