import express from 'express';
import { publishMessage } from '../rabbitmq/rabbitmq'; 
import { errorMessage } from '../utils/errorMessage'
const router = express.Router();

export default router;