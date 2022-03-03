const mongoose = require('mongoose')
const config = require('config')

//connect to mongoDB
mongoose.connect(config.connectionString,{ useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open',function(){
    console.log('Db connected...')
}).on('error',function(error){
    console.log('Connection error: ',error)
})

module.exports={mongoose}; 