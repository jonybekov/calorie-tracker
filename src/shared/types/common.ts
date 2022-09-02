export type ID = string;

export interface IList<T = unknown> {
  data: T[];
  count: number;
}
