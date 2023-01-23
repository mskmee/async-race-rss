import { IPageState } from './IPageState';

export interface IGarageState extends IPageState {
  newCarName: string,
  newCarColor: string,
  activeCar: number;
  activeCarName: string,
  activeCarColor: string
}