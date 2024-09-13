const express = require('express');
const router = express.Router();
var response = require('../model/response');
var order = require('../model/order')
const crud = require('../crud/order');

// Define routes
router.get('/order', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    crud.getOrders().then(listOf => {
        res.json(listOf);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log("Code has been executed")
      })
});

router.get('/order/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    crud.getOrder(req.params.id).then(listOf => {
        res.json(new response('OK', listOf, null) );
    })
    .catch(err => {
        console.log('Errors: ' + err)
        res.json(new response('ERR', null, err));
    })
    .finally(() => {
        console.log("Code has been executed")
    })
});

router.delete('/order/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    crud.deleteOrder(req.params.id).then(listOf => {
        res.json(new response('OK', listOf, null) );
    })
    .catch(err => {
        console.log('Errors: ' + err)
        res.json(new response('ERR', null, err));
    })
    .finally(() => {
        console.log("Code has been executed")
    })
});

router.post('/order', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    var newOrder = new order(
        req.body.id,
        req.body.title,
        req.body.quantity,
        req.body.message,
        req.body.city
    );
    crud.addOrder(newOrder).then(listOf => {
        res.json(new response('OK', listOf, null) );
    })
    .catch(err => {
        console.log('Errors: ' + err)
        res.json(new response('ERR', null, err));
    })
    .finally(() => {
        console.log("Code has been executed")
    })
});

//router.put('/book/:id', (req, res) => {
//  const userId = req.params.id;
//  res.send(`Update book ${userId}`);
//});

//router.delete('/book/:id', (req, res) => {
//  const userId = req.params.id;
//  res.send(`Delete book ${userId}`);
//});

module.exports = router;