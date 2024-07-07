import { Request, Response } from 'express';
import { ProductModel } from "../models/product";
import { errorMessage } from '../utils/errorMessage';

export const getProductsByIds = async (req: Request, res: Response) => {
  try {
    if (typeof req.query.ids !== 'string') {
      return res.status(400).send('Product IDs are required');
    }

    const productIds = req.query.ids.split(',');
    const products = await ProductModel.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (err) {
    res.status(500).send(`Error fetching products: ${errorMessage(err)}`);
  }
};
