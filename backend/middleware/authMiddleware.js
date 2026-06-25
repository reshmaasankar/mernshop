import jwt from 'jsonwebtoken'
import ayncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

const protect = ayncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if(token){
        try {
            const dcoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(dcoded.userId).select('-password');
            next();
        }catch{
            res.status(401)
        }
    }else{
        res.status(401)
    }
});

const admin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
    }
}

export {protect, admin}