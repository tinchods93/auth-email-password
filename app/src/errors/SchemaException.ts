import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { ErrorHandlerInterface } from './interfaces/ErrorHandlerInterface';

/**
 * Represents a `SchemaException`.
 * @class
 * @implements {ErrorHandlerInterface}
 */
export default class SchemaException
  extends Error
  implements ErrorHandlerInterface
{
  private zodError: ZodError;

  constructor(zodError: ZodError, message = '') {
    super(message);
    this.name = 'SchemaException';
    this.zodError = zodError;
  }

  /**
   * Handles the `SchemaException` by building and returning an error payload.
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
    console.log(JSON.stringify(this.zodError));
    return JSON.stringify({
      payload: {
        message: this.messageAdapter(this.zodError.issues),
        name: this.name,
      },
      status: StatusCodes.BAD_REQUEST,
    });
  }

  /**
   * Adapts the Zod issues messages to a more user-friendly format.
   * @param issues - The Zod issues.
   * @returns An array of objects, each containing a message and a path.
   */
  private messageAdapter(issues: any) {
    // takes the zod issues message and adapts it to a more user-friendly message
    const message = issues.map((issue: any) => {
      return {
        message: issue.message,
        path: issue.path.join('.'),
      };
    });
    return message;
  }
}
