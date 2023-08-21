const BaseException = require("./base.exception");

class UnprocessableException extends BaseException {
  constructor({ message, details }) {
    super();
    this.message = message;
    this.status = 422;
    this.exception = "UnprocessableException";
    this.details = details;
  }
};

module.exports = UnprocessableException;
