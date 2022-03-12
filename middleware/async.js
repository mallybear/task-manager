// We take our controller as an argument (fn) and since we return a function, we have access to (req,res,next) that are coming from
// the express and we set up the try catch block. Here we have await because our controller is still async and we know that by
// default async functions will always return a promise. So here we have an await, and we are waiting for that promise to be setlled,
// either resolved or rejected. If we trigger an error,  we will catch it and pass it to a next set of middleware.

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper