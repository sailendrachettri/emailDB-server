const express = require('express');
const Email = require('../models/email.models')

const router = express.Router();

// ROUTE 1: add email to database
router.post('/add', (req, res)=>{
    res.send(req.body);
})

module.exports = router