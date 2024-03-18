class CustomError extends Error {
  constructor(message, errorJson) {
    super(message);
    this.errorJson = errorJson;
  }
}

module.exports = CustomError;