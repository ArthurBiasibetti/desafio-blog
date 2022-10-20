export default class ApiError extends Error {
  constructor(
    public statusCode: number,
    public customObject: any,
    private isOperational: boolean = true,
    message: string,
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.customObject = customObject;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
