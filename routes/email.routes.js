const express = require('express');
const Email = require('../models/email.models')

const router = express.Router();

// ROUTE 1: add email to database
router.post('/add', async(req, res) => {

    try {
        const {companyName, companyType, firstEmail, secondEmail, thirdEmail, careerPage, companyLocation, mobile1, mobile2} = req.body;

       const strMobile1 = mobile1.toString();
       const strMobile2 = mobile2.toString();

        if((strMobile1.length > 0 && strMobile1.length != 10) || (strMobile2.length > 0 && strMobile2.length != 10)){
            return res.status(400).json({success: false, message: "Mobile number is invalid"});
        }
    
        if(!(companyName && companyType && firstEmail)){
            return res.status(404).json({status: false, message: "Company name, type and email 1 required"});
        }
    
        const exist = await Email.findOne({
            $or: [
                {firstEmail},
                {companyName}
            ]
        })
    
        if(exist){
            return res.status(409).json({success: false, message: "Details Already exist"});
        }
    
        const docs = await Email.create({companyName, companyType, companyLocation, firstEmail, secondEmail, thirdEmail, mobile1, mobile2,careerPage});
    
        res.status(200).json({success: true, message: "Record added successfully!", docs: docs})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Not able to add record", error: error.message});
    }
})

router.get('/fetch', async(req, res)=>{
    try {
        const response = await Email.find();
        res.status(200).json({success: true, emails: response});

    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", error: error.message});
    }

})

module.exports = router