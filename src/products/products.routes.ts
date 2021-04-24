import { Application } from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config';
import QueryMiddleware from '../common/middleware/query.middleware';
import ProductsController from './controllers/products.controller';


export class ProductRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ProductsRoutes')
  }

  configureRoutes() {

    this.app
        .route('/products')
        .get(
          QueryMiddleware.validateQueryParams,
          ProductsController.list
        )
        .post(ProductsController.create)

    this.app
        .route('/products/:slug')
        .get(ProductsController.get)
        .patch(ProductsController.patch)
        .delete(ProductsController.delete)


    return this.app
  }
}