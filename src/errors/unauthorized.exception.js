const BaseException = require("./base.exception");

class UnauthorizedException extends BaseException {
    constructor(message) {
        super()
        this.message = message
        this.status = 401
        this.exception = 'UnauthorizedException'
    }
}

module.exports = UnauthorizedException