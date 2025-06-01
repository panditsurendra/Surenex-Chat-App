const router = require('express').Router();
const User = require('./../models/user');
const authMiddleware = require('../middlewares/authMiddleware'); 
const cloudinary = require('./../cloudinary');

// get details of the logged-in user
router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        // Assuming req.user.userId is set by the auth middleware
        // console.log('User ID:', req.user.userId);
        const user = await User.findById(req.user.userId); 
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'User details fetched successfully',
            success: true,
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error from userController',
            error: error.message,
        });
    }
});


router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        
        const allUsers = await User.find({_id: { $ne: req.user.userId }}); // Exclude the logged-in user;
        
        res.status(200).json({
            message: 'All Users details fetched successfully',
            success: true,
            user: allUsers,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error from userController',
            error: error.message,
        });
    }
});

router.post('/upload-profile-pic', authMiddleware, async (req, res) => {
    try{
        const image = req.body.image; // not req.user.image:

        //UPLOAD THE IMAGE TO CLODINARY
        const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: 'Bat-Chit'
        });

        //UPDATE THE USER MODEL & SET THE PROFILE PIC PROPERTY
        const user = await User.findByIdAndUpdate(
            {_id: req.user.userId},
            { profilePic: uploadedImage.secure_url},
            { new: true}
        );

        res.send({
            message: 'Profic picture uploaded successfully',
            success: true,
            data: user
        })
    }catch(error){
        res.send({
            message: error.message,
            success: false
        })
    }
})


module.exports = router;