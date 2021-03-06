//Defines client routes to post and get request.
const express = require('express');
const router = express.Router();
const clientAdapter = require('../app/api/logic/adapter');

router.post('/registerClient', clientAdapter.create);
router.post('/updateClient', clientAdapter.update);
router.post('/deleteClient', clientAdapter.delete);
router.post('/getClient', clientAdapter.findOne);
router.post('/rebuild', clientAdapter.rebuild);
router.post('/productsOfClient', clientAdapter.productsOfClient);
router.get('/', clientAdapter.findAll);
router.get('/registerClient',clientAdapter.loadRegister)
router.get('/searchClient',clientAdapter.loadFindOne)
router.get('/updateClient',clientAdapter.loadUpdate)
router.get('/deleteClient',clientAdapter.loadDelete)
module.exports = router;