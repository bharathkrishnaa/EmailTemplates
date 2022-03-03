var mongoose = require('mongoose')

//Template model
var template = mongoose.model('templates',{
    type : {
        type:String,
        maxlength:100
    },
    body: {
        type:String,
        trim: false
    }
})

module.exports = { template } ;