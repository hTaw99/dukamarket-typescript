import { AxiosError } from "axios";

export class TooLongTimeError extends AxiosError {
  constructor(public message: string) {
    super(message);
    this.name = "TooLongTimeError";
  }
}
