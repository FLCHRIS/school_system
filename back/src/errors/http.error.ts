import { ValidationError } from "@/types/error.types";

export class HttpError extends Error {
  statusCode: number;
  detail?: string;
  errors?: ValidationError[];

  constructor(
    statusCode: number,
    title: string,
    detail?: string,
    errors?: ValidationError[]
  ) {
    super(title);
    this.statusCode = statusCode;

    if (detail) this.detail = detail;
    if (errors) this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
