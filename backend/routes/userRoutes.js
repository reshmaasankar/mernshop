import express from 'express';
import { authUser, logout, getProfile, register } from "../controllers/userController.js";
const router = express.Router();

router.route('/').post(register);
router.post('/login', authUser);
router.post('/logout', logout);
router.route('/profile').get(getProfile);

export default router;

