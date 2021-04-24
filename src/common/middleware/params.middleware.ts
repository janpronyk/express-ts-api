import debug from 'debug'
import { Request, Response, NextFunction } from 'express'

const log: debug.IDebugger = debug('app:params-middleware')

class ParamsMiddleware {
    validateQueryParams(req: Request, res: Response, next: NextFunction) {

        const { take, skip } = req.query

        //@ts-ignore
        if (!parseInt(take))
            return res.status(400).send({ errors: ['Take query param must be numeric']})
       
        //@ts-ignore
        if (!parseInt(skip))
            return res.status(400).send({ errors: ['Skip query param must be numeric']})
            // throw new Error('Skip query param must be numeric')
        next()   
    }
}

export default new ParamsMiddleware()

