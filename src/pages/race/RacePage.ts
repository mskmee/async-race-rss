import { PageComponent } from '../PageComponent';
import { Pagination } from '../../components/Pagination';
import { ControlContainer } from './ControlContainer';
import { getCars } from '../../API/cars/getCars';
import { CreateRaceField } from './CreateRaceField';
import { IRacePageState } from '../../types/interface/IRacePageState';

export class RacePage extends PageComponent {
  gatherData = async () => {
    const data = await getCars(RacePage.state.activePageNum, RacePage.state.displayItems);
    if(typeof data === 'string') return; //TODO catch err
    RacePage.state.totalCount = data.totalCount;
    RacePage.state.lastPageNum = Math.ceil(data.totalCount / RacePage.state.displayItems) ?? 1;
    this.controlContainer.title.innerText = `Race (${RacePage.state.totalCount})`;
    this.raceField.createCarTrack(data);
    this.pagination?.updateElement(RacePage.state.lastPageNum);
  };
  static state: IRacePageState = {
    totalCount: 1,
    lastPageNum: 1,
    activePageNum: 1,
    displayItems: 7,
    isRace: false,
    animationsArr: [],
    raceMembers: [],
  };
  private raceField = new CreateRaceField();
  private controlContainer = new ControlContainer(this.node, this.raceField);
  pagination?: Pagination;
  constructor() {
    super('race__wrapper');
    this.node.append(this.raceField.node);
    this.render().then();
  }

  createPagination(prevBtnClick: () => void, nextBtnClick: () => void, activePageNum: number, lastPageNum: number) {
    super.createPagination(prevBtnClick, nextBtnClick, activePageNum, lastPageNum);
  }

  paginationPrevOnClick = () => {
    RacePage.state.activePageNum--;
    this.gatherData().then();
  };
  paginationNextOnClick = () => {
    RacePage.state.activePageNum++;
    this.gatherData().then();
  };

  async render(){
    this.gatherData().then();
    this.createPagination(this.paginationPrevOnClick, this.paginationNextOnClick, RacePage.state.activePageNum,
      RacePage.state.lastPageNum);
    this.node.append(this.pagination!.node);
  }
}