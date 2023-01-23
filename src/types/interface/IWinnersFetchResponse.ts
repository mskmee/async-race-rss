import { IWinnersResponse } from './IWinnersResponse';

export interface IWinnersFetchResponse {
  totalCount: number,
  data: IWinnersResponse[],
}