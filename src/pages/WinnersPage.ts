import { PageComponent } from '../templates/PageComponent';
import { fetchData } from '../API/index';
import { IWinnersResponse } from '../types/interface/IWinnersResponse';
import { ICarResponse } from '../types/interface/ICarResponse';
import { dropDownFilterLogo } from '../common/svgIcons';
import { getCarSvg } from '../common/utils';

export class WinnersPage extends PageComponent {
  static pageCount?: number;
  constructor(tag: string, classCss: string[], pageNumber?: number) {
    super(tag, classCss);
    if(pageNumber){
      this.pageNumber = pageNumber;
    }else {
      this.pageNumber = 1;
    }
    this.elementsOnScreen = 10;
    this.elementsCount = 9;
    this.lasPageNumber = 1;
  }

  createElement(){
    const winnersBlock = `
      <h3 class="winners__table-title">Winners</h3>
      <table class="winners__table table">
        <thead class="table__head head">
          <tr class="head__row">
            <th class="head__col">Number</th>
            <th class="head__col head__filter head__id head__filter_none" data-src="none">ID ${dropDownFilterLogo}</th>
            <th class="head__col">Car</th>
            <th class="head__col">Name</th>
            <th class="head__col head__filter head__wins head__filter_none" data-src="none">Wins ${dropDownFilterLogo}</th>
            <th class="head__col head__filter head__time head__filter_none" data-src="none">Best time (seconds) ${dropDownFilterLogo}</th>
          </tr>
        </thead>
        <tbody class="table__body">
         </tbody>
      </table>
    `;
    this.container.innerHTML = winnersBlock;
  }

  createPagination(): Element {
    return super.createPagination();
  }

  async gatherWinnersData(query = `/winners?_page=${this.pageNumber}&_limit=${this.elementsOnScreen}`): Promise<void>{
    const response = await fetchData(query);
    if(typeof response === 'string' || !response.ok){
      const errorMessage = `
        <tr class="table__error">
          <td class="table__error-message"colspan="7">
          Oops! We got error with taking data. Please check JSON server.
          </td>
        </tr>
      `;
      const table = this.container.querySelector('.table__body');
      if(table){
        table.innerHTML = errorMessage;
      }
      return;
    }
    const data: IWinnersResponse[] = await response.json();
    const winnersTitle = this.container.querySelector('.winners__table-title');
    if(winnersTitle){
      const maxCount = response.headers.get('x-total-count');
      if(maxCount && this.elementsOnScreen){
        this.elementsCount = +maxCount;
        this.lasPageNumber = Math.ceil(this.elementsCount / this.elementsOnScreen);
      }
      winnersTitle.innerHTML = `Winners (<span class="winners__count">${maxCount}</span>)`;
    }
    const tableData = this.container.querySelector('.table__body');
    if(tableData){
      while (tableData.firstChild){
        tableData.removeChild(tableData.firstChild);
      }
    }
    this.createWinnerRow(data);
  }

  async gatherCarData(id: number){
    const response = await fetchData(`/garage/${id}`);
    if(typeof response === 'string' || !response.ok){
      return {
        name: '<span class="error">Not found</span>',
        color: '#FF0000',
        id: '<span class="error">Car Err</span>',
      };
    }
    const data: ICarResponse = await response.json();
    return data;
  }

  createWinnerRow(data: IWinnersResponse[]){
    data.forEach((el, index) => {
      this.gatherCarData(el.id).then(data => {
        const car = getCarSvg(data.color);
        const rowData = `
       <tr class="table__row">
          <td class="table__row-data">${index + 1}</td>
          <td class="table__row-data">${el.id}</td>
          <td class="table__row-data">${car}</td>
          <td class="table__row-data">${data.name}</td>
          <td class="table__row-data">${el.wins}</td>
          <td class="table__row-data">${el.time}</td>
       </tr>
       `;
        const table = this.container.querySelector('.table__body');
        if(table){
          table.innerHTML += rowData;
        }
      });
    });
  }

  addEventsListeners(){
    const [id, wins, time] = Array.from(this.container.querySelectorAll('.head__filter'));
    if(id && wins && time){
      id.addEventListener('click', () => this.filterQuery(id, wins, time, 'id'));
      wins.addEventListener('click', () => this.filterQuery(id, wins, time, 'wins'));
      time.addEventListener('click', () => this.filterQuery(id, wins, time, 'time'));
    }
    const [prevBtn, nextBtn] = Array.from(document.querySelectorAll('.pagination__link'));
    if(prevBtn && nextBtn){
      prevBtn.addEventListener('click', () => {
        WinnersPage.pageCount = this.pageNumber;
      });
      nextBtn.addEventListener('click', () => {
        WinnersPage.pageCount = this.pageNumber;
      });
    }
  }

  filterQuery(id: Element, wins: Element, time: Element, initial: string){
    const idSort = id.classList[id.classList.length - 1];
    const winsSort = wins.classList[wins.classList.length - 1];
    const timeSort = time.classList[time.classList.length - 1];
    if(idSort && winsSort && timeSort){
      if(initial === 'id'){
        const newFilterStatus = this.changeFilter(idSort);
        id.classList.remove(idSort);
        if(newFilterStatus){
          id.classList.add(newFilterStatus);
          if(winsSort !== 'head__filter_none'){
            wins.classList.remove(winsSort);
            wins.classList.add('head__filter_none');
          }
          if(timeSort !== 'head__filter_none'){
            time.classList.remove(timeSort);
            time.classList.add('head__filter_none');
          }
          return this.generateQuery(initial, newFilterStatus);
        }
      }
      if(initial === 'wins'){
        const newFilterStatus = this.changeFilter(winsSort);
        wins.classList.remove(winsSort);
        if(newFilterStatus){
          wins.classList.add(newFilterStatus);
          if(idSort !== 'head__filter_none'){
            id.classList.remove(idSort);
            id.classList.add('head__filter_none');
          }
          if(timeSort !== 'head__filter_none'){
            time.classList.remove(timeSort);
            time.classList.add('head__filter_none');
          }
          return this.generateQuery(initial, newFilterStatus);
        }
      }
      if(initial === 'time'){
        const newFilterStatus = this.changeFilter(timeSort);
        time.classList.remove(timeSort);
        if(newFilterStatus){
          time.classList.add(newFilterStatus);
          if(winsSort !== 'head__filter_none'){
            wins.classList.remove(winsSort);
            wins.classList.add('head__filter_none');
          }
          if(idSort !== 'head__filter_none'){
            id.classList.remove(idSort);
            id.classList.add('head__filter_none');
          }
          return this.generateQuery(initial, newFilterStatus);
        }
      }
    }
  }

  generateQuery(initial: string, filter: string){
    const filterValue = filter.split('_').at(-1)?.toUpperCase();
    if(filterValue === 'NONE') return this.gatherWinnersData().then();
    this.gatherWinnersData(`/winners?_page=${this.pageNumber}&_limit=${this.elementsOnScreen}&_sort=${initial}&_order=${filterValue}`).then();
  }
  changeFilter(filter: string): string | undefined{
    switch (filter) {
    case 'head__filter_none':
      return 'head__filter_asc';
    case 'head__filter_asc':
      return 'head__filter_desc';
    case 'head__filter_desc':
      return 'head__filter_none';
    }
  }


  render(): HTMLElement {
    this.createElement();
    this.gatherWinnersData().then(() => {
      this.container.after(this.createPagination());
      this.addEventsListeners();
    });
    return super.render();
  }
}