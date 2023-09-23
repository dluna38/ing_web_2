const mongoose = require('mongoose')
require('dotenv').config()

const mongoConn = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('Mongo OK')
    }catch(e){
        console.log('Error', e)
        throw new Error('Error conectando a Mongo')
    }
}

module.exports = { mongoConn }


