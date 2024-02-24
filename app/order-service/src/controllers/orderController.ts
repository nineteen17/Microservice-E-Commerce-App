import { Request, Response } from 'express';
import { createOrderWithInventoryCheck } from '../services/orderService';
import { errorMessage } from '../utils/errorMessage';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await createOrderWithInventoryCheck(req.body);
    res.status(201).json(order);

  } catch (error) {
    res.status(400).json({
      message: 'Error creating order',
      error: errorMessage(error),
    });
  }
};
