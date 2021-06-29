const  {Router} = require('express');//funcion de express permite llaamr a mi funcion de mi router
const { check } = require('express-validator');

 const validarCampos = require('../middlewares/validar-campos');
 const {validarJWT}=require('../middlewares/validar-jwt')
 const {esAdminRol, tieneRole}= require('../middlewares/validar-roles')
// const {validarCampos,
//        validarJWT,
//        tieneRole,
//        esAdminRol
//       } = require('../middlewares')
const {esRoleValido, emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');

const {usuariosGet,
       usuariosPut,
       usuariosPost,
       usuariosDelete,
       usuariosPatch
                     } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
] ,usuariosPut);

  router.post('/',[
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password no es valido').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE,USER_ROLE']),
    validarCampos
  ],usuariosPost );

  router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],usuariosDelete);
 
  router.patch('/',usuariosPatch);



module.exports = router;