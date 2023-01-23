import { ICarsResponse } from './ICarsResponse';

export interface ICarsFetchResponse {
  totalCount: number,
  data: ICarsResponse[],
}