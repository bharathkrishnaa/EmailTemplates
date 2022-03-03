const userRoutes = require('express').Router();
const jwt = require('jsonwebtoken')
const config = require('config')

//Endpoint to create token
userRoutes.get('/', (req, res) => {
    
const token = jwt.sign({id:"pass"}, 'sadasdsa');
res.send(token)
})

module.exports = userRoutes;