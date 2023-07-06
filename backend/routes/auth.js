const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/User');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router=express.Router();

const JWT_SECRET='letslearnnodejswithharry'
//creat a user
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:3})
],async(req,res)=>{
  let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({success,result:result.array()});
    }
    const salt=await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt);
    // secpass=req.body.password;
    try {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secpass 
        });
        const data={
          user:{
            id:user.id
          }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        // console.log(jwtData);
        // res.json(user);
        success=true;
        res.json({success,authToken})
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({error: 'Email already exists' });
        }
        if(error.code===400){
            return res.status(400).json({ error: error.array() });
        }
        console.error(error);
        res.status(500).json({error: 'Server error' });
      }
    });

    //authenticate a user using post "/api/auth/login".no login reguired
    router.post('/login',[
      body('email').isEmail(),
      body('password').isLength({min:3})
    ],async(req,res)=>{
      const result = validationResult(req);
      let success=false;
      if (!result.isEmpty()) {
          return res.status(400).json({result:result.array()});
      }
      const {email,password}=req.body;
      try {
        let user=await User.findOne({email});
        if(!user){
          success=false;
          return res.status(400).json({success,error:"user does not exist"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success=false;
          return res.status(400).json({success,error:"user does not exist"})
        }
        const data={
          user:{
            id:user.id
          }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
      }
  })


  //convert the token to get user data
  // router.post('/getuser',fetchuser,async(req,res)=>{
  //   try {
  //     const userid=req.user.id
      
  //     const user=await User.findById(userid).select("-password")
  //     res.send(user)
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(500).send("some error occured")
  //   }
  // });
  router.post("/getuser", fetchuser, async (req, res) => {
    try {
      
      const userId = req.user;
      console.log({userId})
      const user = await User.findById( `${userId.id}`).select("-password");
      res.send(user);
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports=router