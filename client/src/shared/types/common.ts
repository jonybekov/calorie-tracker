import { Moment } from "moment";

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

export type IQueryKey = [string, IRangeParams];

export interface IRangeParams {
  startDate?: Moment | null;
  endDate?: Moment | null;
}

export interface IErrorResponse {
  message: string;
  code: number;
}
