const templateRoutes = require('express').Router();
const jwt = require('jsonwebtoken')

var { template } = require('../models/template.model')
var { url } = require('../models/url.model')

// Endpoint to get all saved templates
templateRoutes.get('/', (req, res) => {
    token = req.headers['authorization']
    let verify;
    if (!token) res.status(401).send('Acess Denied');
    else {
        try {
            verify = jwt.verify(token.toString(), 'sadasdsa')
        } catch (err) {
            res.status(402).send('Token invalid')
        }
        if (verify) {
            template.find().then((doc) => {
                res.send(doc);
            }, (err) => {
                res.status(400).send(err);
            });
        }
    }
})

// Endpoint to post a new template
templateRoutes.post('/', (req, res) => {
    var body = req.body;
    let verify;
    token = req.headers['authorization']
    if (!token) res.status(401).send('Acess Denied');
    else {
        try {
            verify = jwt.verify(token.toString(), 'sadasdsa')
        } catch (err) {
            res.status(402).send('Token invalid')
        }
        if (verify) {
            var templ = new template({
                type: body.type,
                body: body.templ_body
            })

            template.find({ type: body.type }).then((doc) => {
                if (doc.length == 0) {
                    templ.save().then((doc) => {
                        res.send('template created successfully')
                    }, (err) => {
                        res.status(400).send(err);
                    })
                }
                else
                    res.send('template type already exist')
            })
        }
    }
})

// Endpoint to delete a template
templateRoutes.delete('/', (req, res) => {
    var type = req.query.type;
    let verify;
    token = req.headers['authorization']
    if (!token) res.status(401).send('Acess Denied');
    else {
        try {
            verify = jwt.verify(token.toString(), 'sadasdsa')
        } catch (err) {
            res.status(402).send('Token invalid')
        }
        if (verify) {
            template.deleteOne({ 'type': type }).then((doc) => {
                if (doc.deletedCount == 0)
                    res.jsonp("No template of this type")
                else
                    res.jsonp(doc.deletedCount + " template deleted")
            }, (err) => {
                res.status(400).send(err);
            });
        }
    }
})

// Endpoint to update a template
templateRoutes.put('/', (req, res) => {
    var type = req.query.type;
    var body = req.body;
    let verify;
    token = req.headers['authorization']
    if (!token) res.status(401).send('Acess Denied');
    else {
        try {
            verify = jwt.verify(token.toString(), 'sadasdsa')
        } catch (err) {
            res.status(402).send('Token invalid')
        }
        if (verify) {
            template.updateOne({ 'type': type }, { body: body.templ_body }).then((doc) => {
                if (doc.nModified == 0)
                    res.jsonp("No template of this type")
                else
                    res.jsonp(" template modified")
            }, (err) => {
                res.status(400).send(err);
            });
        }
    }
})

// Endpoint to get a custom sms
templateRoutes.get('/custom', (req, res) => {
    var input = req.body.input;
    var type = req.query.type;
    let verify;
    token = req.headers['authorization']
    if (!token) res.status(401).send('Acess Denied');
    else {
        try {
            verify = jwt.verify(token.toString(), 'sadasdsa')
        } catch (err) {
            res.status(402).send('Token invalid')
        }
        if (verify) {
            template.find({ 'type': type }).then((doc) => {


                if (doc.length == 0)
                    res.jsonp("No template of this type")
                else {
                    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                    if (!regex.test(input)) {
                        var output = doc[0].body.replace(/custom/g, input);
                        res.jsonp(output)
                    }
                    else {
                        var Url = new url({
                            url: input
                        })
                        url.find({ url: input }).then((find) => {
                            if (find.length == 0) {
                                Url.save().then((url) => {
                                    url = `https://somedoma.in/%7B%7Bkey%7D%7D${url._id}`
                                    var output = doc[0].body.replace(/custom/g, url);
                                    res.jsonp(output)
                                }, (err) => {
                                    res.status(400).send(err);
                                })
                            }
                            else {
                                let url = `https://somedoma.in/%7B%7Bkey%7D%7D${find[0]._id}`
                                var output = doc[0].body.replace(/custom/g, url);
                                res.jsonp(output)
                            }



                        }, (err) => {
                            res.status(400).send(err);
                        })
                    }

                }
            }, (err) => {
                res.status(400).send(err);
            });
        }
    }
})

module.exports = templateRoutes;