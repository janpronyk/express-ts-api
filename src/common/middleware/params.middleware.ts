import { Request, Response, NextFunction } from 'express'


class ParamsMiddleware {
    paginationParamsToBody(req: Request, res: Response, next: NextFunction) {
        const { take, skip } = req.params
        if(!take && skip )
            return res.status(400).send({ 
                errors: ['Params take and/or skip are missing.']})
        
        const takeToInt = parseInt(take)
        const skipToInt = parseInt(skip)
        if(!takeToInt && !skipToInt)
            return res.status(400).send({ 
                errors: ['Invalid params take and/or int. Must be numeric values.']})

        req.body.take = takeToInt
        req.body.skip = skipToInt

        next()   
    }
}

export default new ParamsMiddleware()

