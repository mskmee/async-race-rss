import { IPageState } from './IPageState';

export interface IWinnersPageState extends IPageState {
  sortItem: string,
  sortDirection: string,
}