const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {getLikes ,crearLikes ,actualizarLikes ,eliminarLikes } = require('../controllers/likes');

const router = Router();

router.get( '/', getLikes );


router.use( jwtValidator )

router.post(
    '/',
    [
        check('likes','El comentario es obligatorio'),
        check('post','El post es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearLikes 
);

router.put( 
    '/:id',
    [
        check('likes','El comentario es obligatorio'),
        check('post','El post es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ],  
    actualizarLikes );

router.delete( '/:id', eliminarLikes );

module.exports = router;