const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
         
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true,
            useFindAndModify:false//Se coloca este objeto por documentacion de moongose
        });
        console.log('Bases de datos online')


    } catch (error) {
        throw new Error('Errror en la base de datos')
        
    }

}

module.exports ={
    dbConnection
}