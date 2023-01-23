import { IWinnersPageState } from '../../types/interface/IWinnersPageState';
import { PageComponent } from '../PageComponent';
import { Pagination } from '../../components/Pagination';
import { WinnersTableHead } from './winnersTableHead';
import { getWinners } from '../../API/winners/getWinners';
import { WinnersErrorComponent } from './WinnersErrorComponent';
import { getCar } from '../../API/cars/getCar';
import { WinnersCreateTableRow } from './WinnersCreateTableRow';
import { ICarsResponse } from '../../types/interface/ICarsResponse';
import { filterChange } from './WinnersFiltersEvents';

export class WinnersPage extends PageComponent {
  private table = new WinnersTableHead((e) => {
    filterChange(e);
    this.createRows().then();
  });
  public pagination?: Pagination;
  static state: IWinnersPageState = {
    sortItem: '',
    sortDirection: 'none',
    displayItems: 10,
    activePageNum: 1,
    lastPageNum: 1,
    totalCount: 0,
  };
  constructor() {
    super('winners__wrapper');
    this.renderPage().then();
  }

  async createRows(){
    const winnersData = await this.gatherWinnersData();
    if(winnersData){
      const tableRows = this.table.node.querySelectorAll('tr');
      if(tableRows.length > 1){
        for(let i = 1; i < tableRows.length; i++){
          tableRows[i].remove();
        }
      }
      winnersData.forEach((winner, index) => {
        this.gatherCarInfo(winner.id).then(carData => {
          const row = new WinnersCreateTableRow(index + 1, winner.id, carData.color, carData.name,
            winner.wins, winner.time);
          this.table.append(row.node);
        });
      });
    }
  }

  async gatherWinnersData(){
    const response = await getWinners(WinnersPage.state.activePageNum, WinnersPage.state.displayItems,
      WinnersPage.state.sortItem, WinnersPage.state.sortDirection);
    if(typeof response === 'string'){
      const error = new WinnersErrorComponent();
      return this.table.append(error);
    }
    WinnersPage.state.lastPageNum = Math.ceil(response.totalCount / WinnersPage.state.displayItems) ?? 1;
    this.table.caption.node.textContent = `Winners (${response.totalCount})`;
    this.pagination?.updateElement(WinnersPage.state.lastPageNum);
    return response.data;
  }

  async gatherCarInfo(id: number):Promise<ICarsResponse>{
    const carInfo = await getCar(id);
    if(typeof carInfo === 'string'){
      return {
        name: 'Error, check JSON server',
        color: '#FF0000',
        id: 666
      };
    }
    return carInfo;
  }
  createPagination(prevClick: () => void, nextClick: () => void, activePageNum: number, lastPageNum: number) {
    super.createPagination(prevClick, nextClick, activePageNum, lastPageNum);
  }
  paginationPrevOnClick = () => {
    WinnersPage.state.activePageNum--;
    this.createRows().then();
  };
  paginationNextOnClick = () => {
    WinnersPage.state.activePageNum++;
    this.createRows().then();
  };

  async renderPage(): Promise<void>{
    await this.createRows().then(() => {
      this.createPagination(this.paginationPrevOnClick, this.paginationNextOnClick, WinnersPage.state.activePageNum,
        WinnersPage.state.lastPageNum);
      this.node.append(this.table.node, this.pagination!.node);
    });
  }
}