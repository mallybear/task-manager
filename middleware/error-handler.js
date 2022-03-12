// err is coming from our asyncWrapper
const { CustomAPIError } = require('../errors/custom-error') // have to put in curly braces

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg:err.message})
    }
    //return res.status(err.status).json({ msg: err.message })
     return res.status(500).json({ msg: 'Something went wrong' })  // can set up a custom message
}

module.exports = errorHandlerMiddleware