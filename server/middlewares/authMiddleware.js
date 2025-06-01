const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{
        // const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
        // if (!token) { // this line will not work if the token is not provided in the header
        //     return res.status(401).json({
        //         message: 'Unauthorized: No token provided',
        //     });
        // }

        const authHeader = req.headers.authorization;
        // console.log('Authorization Header:', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[1];


        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // it will return {userId: user._id, email: user.email};

        req.user = decodedToken;// Attach user info to the request object
        // req.user = {
        //     userId: decodedToken.userId,
        //     email: decodedToken.email
        // };
        // Now you can access req.user.id and req.user.email in your route handlers

        next();
    }catch(error){
        res.status(500).json({
            message: 'Internal Server Error from authMiddleware',
            error: error.message
        });
    }
}