// The async handler makes it unnecessary to use try-catch blocks in the controller.

const asyncHandler = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;