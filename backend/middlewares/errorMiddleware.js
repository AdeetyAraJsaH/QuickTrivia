export const notFound = async (req, res, next) => {
    const error = new Error(`Not Found ${req.originalURL}`);
    res.status(404);
    next(error);
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'resource not found'
    }
    console.log(err)
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}