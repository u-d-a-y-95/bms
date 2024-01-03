import { HttpStatus } from "../const/httpStatus";

export class HttpException extends Error {
  constructor(
    public status: HttpStatus,
    public message: string,
    public data: any
  ) {
    super(message);
  }
}
