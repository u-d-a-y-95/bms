import { HttpStatus } from "../const/httpStatus";

export class HttpResponse {
  public status: HttpStatus;
  public message: string;
  public data: any;
  constructor(status: HttpStatus, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
