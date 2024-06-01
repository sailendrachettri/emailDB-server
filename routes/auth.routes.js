const express = require('express');
const User = require('../models/user.models');
const bcryptjs = require('bcryptjs');

const router = express.Router();

// ROUTE 1: save user info to database
router.post('/register', async(req, res)=>{

    const {username, password} = req.body

    if(!(username && password)){
        return res.status(400).json({success: false, message: "Username and Password are required"});
    }
    
    const alreadyExist = await User.findOne({username});
    console.log(alreadyExist);
    
    if(alreadyExist){
       return res.status(400).json({success: false, message: "Account with this username already exist"});;
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const user = await User.create({username, password: hashPassword});

    res.status(200).json({success: true, message: "User created successfully!", user});

})

// ROUTE 2: login the user
router.post('/login', async(req, res)=>{
    const {username, password} = req.body;

    if(!(username && password)){
        return res.status(400).json({success: false, message: "Username and Password are required"});
    }

    const findUser = await User.findOne({username});

    if(!findUser){
        return res.status(404).json({success: false, message: "User doesn't exist"});
    }

    console.log(findUser);

    const comparePassword = bcryptjs.compareSync(password, findUser.password);

    if(!comparePassword){
        return  res.status(400).json({success: false, message: "Invalid credentials"});
    }

    res.status(200).json({success: true, message: "Logged in successful", findUser});
})

module.exports = router