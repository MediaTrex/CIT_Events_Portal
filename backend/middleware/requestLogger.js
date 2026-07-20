import logger from '../src/logger.js'

export default function requestLogger(req, res, next){
    const start = Date.now();

    res.on('finish', () => {
        logger.info({
            message: "HTTP Request",
            id: req.ip,
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            responseTime: `${Date.now() - start} ms`,
            userAgent: req.get("User-Agent")
        });
    });
    next();
}