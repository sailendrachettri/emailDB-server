const express = require('express');

const router = express.Router();

// ROUTE 1: save user info to database
router.post('/register', (req, res)=>{
    res.send("hello");
})

// ROUTE 2: login the user
router.post('/login', (req, res)=>{
    res.send("hello");
})

module.exports = router