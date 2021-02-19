const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config')

const sauceCtrl = require('../controllers/sauces');

router.post('/',auth ,multer,sauceCtrl.createSauce);
router.put('/:id',auth ,multer,sauceCtrl.modifySauce);
router.delete('/:id',auth ,sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.findOneSauce);
router.get('/', auth, sauceCtrl.findAllSauce)

module.exports = router;