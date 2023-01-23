import { PageComponent } from '../PageComponent';
import { Pagination } from '../../components/Pagination';
import { IGarageState } from '../../types/interface/IGarageState';
import { Component } from '../../components/elements/Component';
import { AddCarForm } from './AddCarForm';
import { GarageContainer } from './GarageContainer';
import { getCars } from '../../API/cars/getCars';

export class GaragePage extends PageComponent{
  gatherData = async () => {
    const data = await getCars(GaragePage.state.activePageNum, GaragePage.state.displayItems);
    if(typeof data === 'string') return; //TODO catch err
    GaragePage.state.totalCount = data.totalCount;
    GaragePage.state.lastPageNum = Math.ceil(data.totalCount / GaragePage.state.displayItems) ?? 1;
    this.title.node.textContent = `Garage (${GaragePage.state.totalCount})`;
    this.carsList.createCarsList(data);
    this.pagination?.updateElement(GaragePage.state.lastPageNum);
  };
  private garageContainer = new Component({
    tag:'div',
    className: 'garage__cars-wrapper',
    parent: this.node,
  });
  private title = new Component({
    tag: 'h1',
    className: 'garage__title-count',
    textContent: 'Garage',
    parent: this.garageContainer,
  });
  private addCarForm = new AddCarForm(this.garageContainer.node, this.gatherData);
  private carsList = new GarageContainer(this.garageContainer.node, this.gatherData);
  public pagination?: Pagination;
  static state: IGarageState = {
    totalCount: 0,
    activePageNum: 1,
    lastPageNum: 0,
    displayItems: 7,
    activeCar: 1,
    newCarColor: '',
    newCarName: '',
    activeCarName: '',
    activeCarColor: '',
  };

  constructor() {
    super('garage__wrapper');
    this.renderPage().then();
  }
  createPagination(prevClick: () => void, nextClick: () => void, activePageNum: number, lastPageNum: number) {
    super.createPagination(prevClick, nextClick, activePageNum, lastPageNum);
  }

  paginationPrevOnClick = () => {
    GaragePage.state.activePageNum--;
    this.gatherData().then();
  };

  paginationNextOnClick = () => {
    GaragePage.state.activePageNum++;
    this.gatherData().then();
  };

  async renderPage(): Promise<void>{
    await this.gatherData();
    this.createPagination(this.paginationPrevOnClick, this.paginationNextOnClick, GaragePage.state.activePageNum,
      GaragePage.state.lastPageNum);
    this.node.append(this.pagination!.node);
  }
}