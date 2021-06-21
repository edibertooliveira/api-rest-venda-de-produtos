import { Request, Response } from 'express';
import {
  CreateProductService,
  DeleteProductService,
  ListProductsService,
  ShowProductService,
  UpdateProductService,
} from '../services';

export default class ProductsController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductsService();
    const products = await listProducts.execute();
    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findProduct = new ShowProductService();
    const product = await findProduct.execute({ id });
    return res.status(200).json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return res.status(201).json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    return res.status(206).json({});
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    return res.status(200).json(product);
  }
}
