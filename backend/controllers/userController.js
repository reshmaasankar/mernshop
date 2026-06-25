import ayncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateTokens.js';

const authUser = ayncHandler(async(req, res) => {
    console.log('auth called')
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password!!!');

    }
});

const register = ayncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        res.status(400);
        throw new Error('User already exist!')
    }else{
        const user = await User.create({
            name, email, password
        });
        if(user) {
            generateToken(res, user._id)
            res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
        }else{
            res.status(400)
        }
    }
});

const getProfile = ayncHandler(async(req, res) => {
    const {_id, name, email} = req.body;
    const user = await User.findById(_id);
    if(user){
        res.send(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404);
    }
});

 const logout = ayncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged out!!!'})
 });

export {authUser, logout, register, getProfile};