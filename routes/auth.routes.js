const express = require('express');
const User = require('../models/user.models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const comparePassword = bcryptjs.compareSync(password, findUser.password);

    if(!comparePassword){
        return  res.status(400).json({success: false, message: "Invalid credentials"});
    }

    const payload = {
        username
    };

    const jwt_token = jwt.sign(payload, process.env.JWT_SECRET);

    res.cookie('jwt_token', jwt_token, {sameSite: 'none', secure: true}).status(200).json({success: true, message: "Logged in successful", username: findUser.username});
})

// ROUTE 3: GET USER PROFILE
router.get('/profile', async(req, res)=>{
    
    try {
        const {jwt_token} = req.cookies;
        const userInfo = jwt.verify(jwt_token, process.env.JWT_SECRET);
        res.status(200).json({success: true, message: "Userinfo fetch successfully", userInfo});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Not able to fetch userinfo", error: error.message});
    }
})

// ROUTE 4: handle logout
router.post('/logout', (_, res)=>{
    try {

        res.clearCookie('jwt_token', {
            sameSite: 'none',
            secure: true
        });

        res.status(200).json({success: true, message: "Logout successful"});
        
    } catch (error) {
        console.log("logout err: ", error.message);
        res.status(500).json({success: false, message: "Not able to logout", error: error.message});
    }
})

module.exports = router