module.exports = (err, req, res, next) => {
    console.log(err);
  
    if (err.exception) {
      return res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
      });
    }
  
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  };