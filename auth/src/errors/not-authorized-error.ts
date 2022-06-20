import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; fields?: string | undefined }[] {
    return [
      {
        message: "Not Authorized",
      },
    ];
  }
}
