const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {User} = require('../models');
const { use } = require('react');

const JWT_SECRET = process.env.JWT_SECRET || "Error In JWT Token. CHeck It";

exports.login = async(req,res)=>{
    const {email,password} =req.body;

    try{
        const user = await User.scope('withPassword').findOne({where:{email}});

        if(!user){
            return res.status(401).json({message:'Authentication failed. User not found.'});

        }
        //store password securely
         const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials (Password mismatch).' }); 
        }

    //Generate JWT Token
        const token = jwt.sign(
            {id:user.id,
                email:user.email,
                role:user.role
            },
            JWT_SECRET,
            {expiresIn:'1h'}
        );

        //send ther token and role back to the client

        res.json({
            token,
            role:user.role,
            message:'Login successful',
        });

    }catch(error){
       console.log('Login Error:',error);
       res.status(500).json({message:'Server error during the logging'});
    }
};


