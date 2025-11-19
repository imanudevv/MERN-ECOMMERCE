import express from 'express';
import { verifyUserAuth } from '../middleware/userAuth';
import { createNewOrder } from '../controller/orderController';
const router=express.Router();

router.route('/new/order').post(verifyUserAuth,createNewOrder)

export  default router;