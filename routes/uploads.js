const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImagen,actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const { validarCampos ,validarArchivo} = require('../middlewares');


const router = Router();

router.post( '/', cargarArchivo)

router.put( '/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
] ,actualizarImagenCloudinary)
//ctualizarImagen )

router.get('/:coleccion/:id',[
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
],mostrarImagen)

module.exports = router;