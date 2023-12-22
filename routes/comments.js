const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getComments, crearComment, eliminarComment, actualizarComment } = require('../controllers/comments');

const router = Router();

router.get( '/', getComments );


router.use( jwtValidator )

router.post(
    '/',
    [
        check('comment','El comentario es obligatorio').not().isEmpty(),
        check('post','El post es obligatorio').not().isEmpty(),
        check('thread','El post es obligatorio'),
        check('likes','El post es obligatorio'),
        check('userData','El user no existe').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearComment 
);

router.put( 
    '/:id',
    [
        check('comment','El comentario es obligatorio').not().isEmpty(),
        check('post','El post es obligatorio').not().isEmpty(),
        check('thread','El post es obligatorio'),
        check('likes','El post es obligatorio'),
        check('userData','El user no existe').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ],  
    actualizarComment );

router.delete( '/:id', eliminarComment );

module.exports = router;