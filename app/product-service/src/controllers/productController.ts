import { Request, Response } from "express";
import { ProductModel } from "../models/product";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
      } catch (error) {
        res.status(400).send(error);
      }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const query: any = {};
  
      // Handle string fields with case-insensitive partial matching
      const stringFields = ['name', 'brand', 'type'];
      stringFields.forEach(field => {
        const fieldValue = req.query[field];
        if (typeof fieldValue === 'string') { // Ensure fieldValue is strictly a string
          query[field] = new RegExp(fieldValue, 'i');
        }
      });
  
      // Handle numeric fields, assuming direct matching (extend as needed for ranges)
      const numericFields = ['volume', 'price', 'alcoholContent'];
      numericFields.forEach(field => {
        const fieldValue = req.query[field];
        if (typeof fieldValue === 'string') { // Check if fieldValue is a string and convert to number
          query[field] = Number(fieldValue);
        }
      });

      const products = await ProductModel.find(query);
      res.json(products);

    } catch (error) {
      res.status(500).send({ message: error});
    }
  };
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };


  // Example route for the Search API
export const searchProduct = async (req: Request, res: Response) => {
  const { term } = req.query;
  // Implement search logic here, possibly searching across multiple fields
  // Example: searching in 'name' and 'description' fields of a Product
  try {
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).send({ message: error});
  }
};
