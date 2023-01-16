import { PageComponent } from '../templates/PageComponent';
import { fetchData } from '../API';
import { ICarResponse } from '../types/interface/ICarResponse';
import { getCarSvg } from '../common/utils';
import { PopUp } from '../components/PopUp';

export class RacePage extends PageComponent {
  static pageCount?: number;
  private popUp: PopUp;

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
    this.popUp = new PopUp('div', ['pop-up__info']);
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
      <div class="race__car-item car-item ${el.id}">
        <h2 class="car-item__name">${el.name}</h2>
        <div class="car-item__icon-wrapper">
        <form class="car-item__form">
          <button data-id="${el.id}" type="button" class="car-item__engage btn car-item__btn">A</button>
          <button data-id="${el.id}" type="button" class="car-item__break btn car-item__btn">B</button>
        </form>
          ${getCarSvg(el.color)}
        </div>
        <hr class="car-item__road">
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
    const raceField = this.container.querySelector('.race__field');
    if(raceField){
      raceField.addEventListener('click', (e) =>{
        const target = e.target;
        if(target instanceof Element){
          if(target.closest('.car-item__engage')){
            const id = target.getAttribute('data-id');
            if(id) this.engageCar(id).then();
          }
          if(target.closest('.car-item__break')){
            console.log(target.getAttribute('data-id'));
          }
        }
      });
    }
  }

  async engageCar(id: string){
    const response = await fetchData(`/engine?id=${id}&status=started`, 'PATCH');
    if(typeof response === 'string' || !response.ok){
      return this.container.append(this.popUp.createPopUp('warning', 'Error! Check JSON server'));
    }
    const data = await response.json();
    console.log(data);
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