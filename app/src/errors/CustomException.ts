import { ErrorHandlerInterface } from './interfaces/ErrorHandlerInterface';

/**
 * Represents a `CustomException`.
 * @class
 * @implements {ErrorHandlerInterface}
 */
export default class CustomException
  extends Error
  implements ErrorHandlerInterface
{
  status: number;

  /**
   * Constructs a new `CustomException`.
   * @param message - An optional error message.
   * @param status - An optional HTTP status code.
   */
  constructor(
    message = 'Custom error message',
    status = 400,
    name = 'CustomException'
  ) {
    super(message);
    this.name = name;
    this.status = status;
  }

  /**
   * Handles the `CustomException` by building and returning an error payload.
   * @returns An `Error` object with the error payload.
   */
  handle() {
    return new Error(this.buildErrorPayload());
  }

  /**
   * Builds the error payload.
   * @returns A stringified JSON object containing the error payload and status.
   */
  private buildErrorPayload() {
    return JSON.stringify({
      payload: {
        message: this.message,
        name: this.name,
      },
      status: this.status,
    });
  }
}
