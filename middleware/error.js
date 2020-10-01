const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    error.message = err.message;

    // Log to console for dev
    console.log(err);

    // Invalid Mongoose ObjectId
    if(err.name === 'CastError'){
        // console.log(`Resource not found with id of ${req.params.id}`);
        error = new ErrorResponse(`Resource not found.`, 404);
    }

    // Mongoose dupliate key
    if(err.code === 11000){
        const message = 'Duplicate field value enetered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose Validation Errors
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error =  new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;