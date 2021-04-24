import { Application } from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config';
import paramsMiddleware from '../common/middleware/params.middleware';
import ProductsController from './products.controller';


export class ProductRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ProductsRoutes')
  }

  configureRoutes() {

    this.app
        .route('/products')
        .get(
          paramsMiddleware.validateQueryParams,
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