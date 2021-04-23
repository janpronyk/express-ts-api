import { Application } from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config';
import CmspagesController from './cmspages.controller';


export class CMSPagesRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'CMSPagesRoutes')
  }

  configureRoutes() {

    this.app
      .route('/pages')
      .get(CmspagesController.list)
      .post(CmspagesController.create)

    this.app
      .route('/pages/:slug')
      .get(CmspagesController.get)
      .patch(CmspagesController.patch)
      .delete(CmspagesController.delete)


      return this.app
  }
  
}