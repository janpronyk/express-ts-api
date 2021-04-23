import { Application } from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config';
import ProductsController from './products.controller';


export class CMSPagesRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ProductsRoutes')
  }

  configureRoutes() {

    this.app
        .route('/pages')
        .get(ProductsController.list)
        .post(ProductsController.create)

    this.app
        .route('/pages/:slug')
        .get(ProductsController.get)
        .patch(ProductsController.patch)
        .delete(ProductsController.delete)


    return this.app
  }
}