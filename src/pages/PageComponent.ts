import { Component } from '../components/elements/Component';
import { Pagination } from '../components/Pagination';

export class PageComponent extends Component {
  public pagination?: Pagination;

  constructor(className: string) {
    super({tag: 'div', className: className});
  }

  createPagination(prevBtnClick: () => void, nextBtnClick: () => void, activePageNum: number, lastPageNum: number, ){
    this.pagination = new Pagination(prevBtnClick, nextBtnClick, activePageNum, lastPageNum);
  }
}