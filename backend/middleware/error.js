
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, request, response, next) => {

    let error = {...err };
    error.message = err.message;

    if(err.name === "CastError"){
        const message = "Resource not found " + err.value;
        error = new ErrorResponse(message, 404);
    }
    
    //Mongoose duplicate value
    if(err.code === 11000){
        const message = "Duplicated field value entered ";
        error = new ErrorResponse(message, 400);
    }
    
    //Mongoose validation error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => " " + val.message);
        error = new ErrorResponse(message, 400);
    }

    response.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error"
    })

    
}

module.exports = errorHandler;