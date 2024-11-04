const loggingMiddleware = (req, res, next) => {
    console.log(`Received a ${req.method} request to ${req.url}.`);
    next();

}

export default loggingMiddleware;