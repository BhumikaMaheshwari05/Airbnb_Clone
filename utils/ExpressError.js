class ExpressError extends Error {
    constructor(message, statusCode) {
      super();         // Call the parent Error constructor
      this.statusCode = statusCode;
      this.message=message;
    }
  }

module.exports=ExpressError