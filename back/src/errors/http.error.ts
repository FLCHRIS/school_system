export class HttpError extends Error {
  statusCode: number;
  detail?: string;

  constructor(statusCode: number, title: string, detail?: string) {
    super(title);
    this.statusCode = statusCode;
    if (detail) this.detail = detail;

    Error.captureStackTrace(this, this.constructor);
  }
}
