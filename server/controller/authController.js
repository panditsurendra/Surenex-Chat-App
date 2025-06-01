const router = require('express').Router();
///// this router is an object that has many methods like get, post, put, delete, etc.
const User = require('./../models/user'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

router.post('/signup', async (req, res) => {
    try{
        //1. if the user is already registered
        const user = await User.findOne({ email: req.body.email })

        //2. if user is already registered, then return an error
        if(user){
            return res.json({ //NOTE: return res.status(400).json({  -> it will ccause an error in the frontend
                message: 'User already Exists',
                success: false,
            });
        }
        
        //3. encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10 );
        req.body.password = hashedPassword;

        //4. create a new user in the database
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({
            message: 'User registered successfully',
            success: true,
            
        });

    }catch(error){
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message //
        });
    }
});


router.post('/login', async (req, res) => {
    try{
        //1. check if the user exists in the database
        const user = await User.findOne({ email: req.body.email });
        //2. if user is not registered, then return an error
        if(!user){
            return res.json({
                message: 'User not found',
                success: false,
            });
        }
        // console.log('User found:', user);
        //3. check if the password is correct
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        //4. if password is not correct, then return an error
        if(!isPasswordValid){
            return res.json({
                message: 'Invalid password',
                success: false,
            });
        }
        //5. if the user exists and password is correct, then assign a jwt
        const payload = {
            userId: user._id,
            email: user.email
            };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.send({ // default status code is 200
            message: 'User logged in successfully',
            success: true,
            token: token,
            // user: {
            //     id: user._id,
            //     email: user.email,
            //     firstname: user.firstname,
            //     lastname: user.lastname,
            //     profilePic: user.profilePic
            // }
        });
    }catch(error){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 
