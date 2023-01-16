import { PageComponent } from '../templates/PageComponent';
import { fetchData } from '../API';
import { ICarResponse } from '../types/interface/ICarResponse';
import { getCarSvg } from '../common/utils';

export class RacePage extends PageComponent {
  static pageCount?: number;
  constructor(tag: string, cssClass: string[], pageNumber?: number) {
    super(tag, cssClass);
    if(pageNumber){
      this.pageNumber = pageNumber;
    }else {
      this.pageNumber = 1;
    }
    this.elementsOnScreen = 7;
    this.elementsCount = 7;
    this.lasPageNumber = 1;
  }

  createElement(){
    const raceBlock = `
        <div class="race__control-wrapper race-control">
          <button class="race-control__btn btn race-control__start">Start Race</button>
          <button class="race-control__btn btn race-control__break">Reset Race</button>
        </div>
        <div class="race__field"></div>
    `;
    this.container.innerHTML = raceBlock;
  }

  async gatherData(){
    const response = await fetchData(`/garage?_limit=${this.elementsOnScreen}&_page=${this.pageNumber}`);
    if(typeof response === 'string' || !response.ok){
      const errorMessage = '<div class="error error__message">Oops we got error.</div>';
      return this.container.innerHTML = errorMessage;
    }
    const garageCarsCount = response.headers.get('x-total-count');
    if(garageCarsCount && this.elementsOnScreen){
      this.elementsCount = +garageCarsCount;
      this.lasPageNumber = Math.ceil(this.elementsCount / this.elementsOnScreen);
    }
    const data: ICarResponse[] = await response.json();
    const raceField = this.container.querySelector('.race__field');
    if(raceField){
      data.forEach(el => {
        const data = this.createCarRoad(el);
        raceField.innerHTML += data;
      });
    }
  }

  createCarRoad(el: ICarResponse): string {
    const data = `
      <div class="race__car-item car-item">
        <h2 class="car-item__name">${el.name}</h2>
        <div class="car-item__icon-wrapper">
        <form class="car-item__form">
          <button type="button" class="car-item__engage btn car-item__btn">A</button>
          <button type="button" class="car-item__break btn car-item__btn">B</button>
        </form>
          ${getCarSvg(el.color)}
          <div class="car-item__road">____________________</div>
        </div>
      </div>
    `;
    return data;
  }

  createPagination(): Element {
    return super.createPagination();
  }

  addEventsListeners() {
    const [prevBtn, nextBtn] = Array.from(document.querySelectorAll('.pagination__link'));
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        RacePage.pageCount = this.pageNumber;
      });
      nextBtn.addEventListener('click', () => {
        RacePage.pageCount = this.pageNumber;
      });
    }
  }

  render(): HTMLElement {
    this.createElement();
    this.gatherData().then(() => {
      this.container.after(this.createPagination());
      this.addEventsListeners();
    });
    return super.render();
  }
}