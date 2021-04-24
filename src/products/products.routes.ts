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
        .route('/pages')
        .get(ProductsController.list, [
          paramsMiddleware.paginationParamsToBody
        ])
        .post(ProductsController.create)

    this.app
        .route('/pages/:slug')
        .get(ProductsController.get)
        .patch(ProductsController.patch)
        .delete(ProductsController.delete)


    return this.app
  }
}