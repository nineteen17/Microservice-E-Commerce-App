import { Request, Response } from "express";
import { ProductModel } from "../models/product";
import { publishMessage } from "../rabbitmq/publish";

export const createProduct = async (req: Request, res: Response) => {

    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();

        const createProductPayload = {
          _id: newProduct._id,
          name: newProduct.name,
          brand: newProduct.brand,
          price: newProduct.price,
          imageUrl: newProduct.imageUrl,
          stockLevel: newProduct.stockLevel
        }
        res.status(201).send(newProduct);
        await publishMessage('product-exchange', 'product.created', createProductPayload);
        
      } catch (error) {
        res.status(400).send(error);
      }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = ProductModel.find();

    const stringFields = ['name', 'brand', 'type'];
    stringFields.forEach(field => {
      const fieldValue = req.query[field];
      if (typeof fieldValue === 'string') {
        query.where(field).regex(new RegExp(fieldValue, 'i'));
      }
    });

    const numericFields = ['volume', 'price', 'alcoholContent'];
    numericFields.forEach(field => {
      const fieldValue = req.query[field];
      if (typeof fieldValue === 'string') {
        const numericValue = Number(fieldValue);
        if (!isNaN(numericValue)) {
          query.where(field).equals(numericValue);
        }
      }
    });


    const sortParam = req.query.sort as string | undefined;
    if (sortParam) {
      const sortDirection = sortParam.startsWith('-') ? 'desc' : 'asc'; 
      const fieldName = sortParam.startsWith('-') ? sortParam.substring(1) : sortParam;
      query.sort({ [fieldName]: sortDirection });
    }

    const products = await query.exec();
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
      const updateProductPayload = {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        imageUrl: product.imageUrl,
        stockLevel: product.stockLevel
      }
      await publishMessage('product-exchange', 'product.updated', updateProductPayload);
      res.send(product).status(200);
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
      await publishMessage('product-exchange', 'product.deleted', req.params.id)
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };


export const searchProduct = async (req: Request, res: Response) => {
  const { term } = req.query;

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
