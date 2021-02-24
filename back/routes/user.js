const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


const rateLimit = require("express-rate-limit");
const createAccountLimiter = rateLimit({
    windowMs : 60 * 60 * 1000, // Fenêtre d'une heure
    max : 100, // commencer à bloquer après 1 demandes
    message : "Trop de comptes créés à partir de cette adresse IP"
  }) ;

router.post('/signup',createAccountLimiter, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
