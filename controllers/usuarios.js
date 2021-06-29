const  {response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')



const usuariosGet = async(req = request, res = response)=> {
  const {limite = 5,desde = 0} = req.query
  const query={estado :true}
    // const usuarios = await Usuario.find()
    // .skip(Number(desde))
    // .limit(Number(limite))

    // const total = await Usuario.countDocuments();

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
     total,
     usuarios
    })
  }

  const usuariosPost =  async(req, res)=> {

    const {nombre, correo, password,rol}  = req.body
    const usuario = new Usuario ({nombre, correo, password, rol})
    
    //Verificar si el correo existe
  
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();//Numeros de vuelta para encriptar la contraseña
    usuario.password = bcryptjs.hashSync(password,salt);

    
    //Guardar en BD
    await usuario.save();
    
    res.json({
          usuario
    })
  }

  const usuariosPut = async(req, res)=> {
      const {id} = req.params
      const { _id,password,google,correo, ...resto} = req.body;


      //Todo validar contra base de datos
    if(password){ 
      //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();//Numeros de vuelta para encriptar la contraseña
    resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
      
    res.json(usuario)
}

 
const usuariosPatch =  (req, res)=> {
  res.json({
      msg:'patch API -controlador'
  })
};



  const usuariosDelete =  async(req, res)=> {
    const {id} = req.params;
    
  //Fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id)
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
  

  //Verificar si el uid tiene estado true
  if(!usuario.estado){
    return res.status(401).json({
      msg: 'Token no valido-usuario con estado false'
    })
  }
  
  
  res.json(req.usuario);
  }



 module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost ,
      usuariosDelete,
      usuariosPatch
  };