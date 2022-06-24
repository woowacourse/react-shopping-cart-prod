class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  toPlainObj() {
    return {
      errorCode: this.code,
      message: this.message,
    };
  }
}

export default ApiError;
