const  BaseException  = require("./base.exception")

class NotFoundException extends BaseException {
    constructor(message) {
        super()
        this.message = message
        this.status = 404
        this.exception = 'NotFoundException'
    }
}

module.exports = NotFoundException