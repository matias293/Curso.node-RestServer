const { v4: uuidv4 } = require('uuid');
const path = require('path')


const subirArchivo = (files, extensionesValidas=['png','jpg','jpeg','gif'],carpeta='' ) =>{ 
     return new Promise ((resolve, reject) => {

     
    const {archivo} = files
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length-1]
    

    if(!extensionesValidas.includes(extension)){
    return  reject(`La extension ${extension} no es permitida`)
        
    }

    const nombreTemp = uuidv4() + '.' + extension;    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   
    const uploadPath = path.join(__dirname ,'../uploads/',carpeta,nombreTemp);
  
    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, (err) => {
      if (err){
        reject(err)
      }
  
      resolve(nombreTemp) 
    });
})
}

module.exports = {
    subirArchivo
}