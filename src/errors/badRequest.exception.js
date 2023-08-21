const  BaseException  = require("./base.exception")

class BadRequestException extends BaseException {
    constructor(message) {
        super()
        this.message = message
        this.status = 400
        this.exception = 'BadRequestException'
    }
}

module.exports = BadRequestException