const  BaseException  = require("./base.exception")

class InvalidTokenException extends BaseException {
    constructor(message) {
        super()
        this.message = message
        this.status = 403
        this.exception = 'Invalid Token'
    }
}

module.exports = InvalidTokenException