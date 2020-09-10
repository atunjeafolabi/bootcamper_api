const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    error.message = err.message;

    // Log to console for dev
    console.log(err.stack);

    // Invalid Mongoose ObjectId
    if(err.name === 'CastError'){
        // console.log(`Resource not found with id of ${req.params.id}`);
        error = new ErrorResponse(`Resource not found with id of ${err.value}`, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;