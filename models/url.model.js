var mongoose = require('mongoose')

//url model
var url = mongoose.model('urls',{
    url : {
        type:String,
        maxlength:100
    }
})

module.exports = { url } ;