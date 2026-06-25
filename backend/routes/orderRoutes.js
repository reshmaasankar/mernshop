import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addOrders,
    geMytOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
 } from "../controllers/orderController.js";
const router = express.Router();
router.route('/').post(protect, addOrders).get(getAllOrders);
router.post('/mine', geMytOrders);
router.get('/:id', getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);
router.route('/:id/deliver').get(updateOrderToDelivered);

export default router;


