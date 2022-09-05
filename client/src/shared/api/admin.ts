import { IStatistics } from "../types";
import { request } from "./api-instance";

export const getStatistics = async (): Promise<IStatistics> => {
  return (await request.get("/statistics")).data;
};
