export enum ErrorCode {
  Unauthorized = 401,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

export type ID = string;

export interface IList<T = unknown> {
  data: T[];
  count: number;
}

export interface IErrorResponse {
  message: string;
  code: number;
}
