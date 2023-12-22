const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getPosts, crearPost, eliminarPost, actualizarPost } = require('../controllers/posts');

const router = Router();

router.get( '/', getPosts );


router.use( jwtValidator )

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('comment','El comentario es obligatorio').not().isEmpty(),
        check('duo','El duo es obligatorio').not().isEmpty(),
        check('lines','La posicion es obligatoria').not().isEmpty(),
        check('userData','el usuario no existe').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearPost 
);

router.put( 
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('comment','El comentario es obligatorio').not().isEmpty(),
        check('duo','El duo es obligatorio').not().isEmpty(),
        check('lines','La posicion es obligatoria').not().isEmpty(),
        check('userData','el usuario no existe').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ],  
    actualizarPost );

router.delete( '/:id', eliminarPost );

module.exports = router;