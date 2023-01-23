import { IPageState } from './IPageState';
import { IRaceMember } from './IRaceMember';
export interface IRacePageState extends IPageState {
  isRace: boolean;
  animationsArr: Animation [];
  raceMembers: IRaceMember[];
}