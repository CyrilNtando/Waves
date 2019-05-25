function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      success: false,
      message: error.message || 'Oops Something Went Wrong!!!!'
    }
  });
}

module.exports = errorHandler;
