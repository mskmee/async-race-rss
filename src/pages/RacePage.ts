import { PageComponent } from '../templates/PageComponent';
import { fetchData } from '../API';
import { ICarResponse } from '../types/interface/ICarResponse';
import { getCarSvg } from '../common/utils';
import { PopUp } from '../components/PopUp';
import { CarRaceFetchStatusCode } from '../types/enum/carRaceFetchStatusCode';
import { ICarsActive } from '../types/interface/ICarsActive';
import { ICarEngineStart } from '../types/interface/ICarEngineStart';
import { ICarPausedAnimations } from '../types/interface/ICarPausedAnimations';

export class RacePage extends PageComponent {
  private readonly pausedAnimation: ICarPausedAnimations;
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
    this.pausedAnimation = {};
  }

  createElement(){
    const raceBlock = `
        <div class="race__control-wrapper race-control">
          <button class="race-control__btn unselectable btn race-control__start">Start Race</button>
          <button class="race-control__btn unselectable btn race-control__break">Reset Race</button>
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
      <div class="race__car-item car-item car-item-${el.id}">
        <h2 class="car-item__name">${el.name}</h2>
        <div class="car-item__icon-wrapper">
        <form class="car-item__form">
          <button data-id="${el.id}" type="button" class="car-item__engage unselectable btn car-item__btn">A</button>
          <button data-id="${el.id}" type="button" disabled class="car-item__break unselectable btn car-item__btn">B</button>
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
          const id = target.getAttribute('data-id');
          if(target.closest('.car-item__engage')){
            if(id) {
              this.carStartRace(+id).then();
            }
          }
        }
      });
    }
  }

  async changeCarEngine(id: number, status: string){
    const response = await fetchData(`/engine?id=${id}&status=${status}`, 'PATCH');
    if(typeof response === 'string' || !response.ok && response.status !== CarRaceFetchStatusCode.carStop){
      return this.container.append(this.popUp.createPopUp('warning', 'Error! Check JSON server'));
    }
    const carItem = this.container.querySelector(`.car-item-${id}`);
    if(response.status === CarRaceFetchStatusCode.carStop && carItem || status === 'stopped' && carItem){
      const [startBtn, stopBtn] = Array.from(carItem.querySelectorAll('.car-item__btn'));
      if(startBtn instanceof HTMLButtonElement && stopBtn instanceof HTMLButtonElement) {
        return [startBtn, stopBtn];
      }
    }
    const data: ICarEngineStart = await response.json();
    const animationTime = data.distance / data.velocity;
    if(carItem){
      const [startBtn, stopBtn] = Array.from(carItem.querySelectorAll('.car-item__btn'));
      if(startBtn instanceof HTMLButtonElement && stopBtn instanceof HTMLButtonElement) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
      }
      const raceRoad = carItem.querySelector('.car-item__road');
      const carModel = carItem.querySelector('.car__icon');
      if(raceRoad && carModel instanceof SVGElement && !isNaN(animationTime)){
        const offSet = raceRoad.clientWidth - carModel.clientWidth + 50;
        const animation = carModel.animate([
          { transform: 'translateX(0)'},
          { transform: `translateX(${offSet}px)`},
        ], {
          duration: animationTime,
        });
        animation.onfinish = () => carModel.style.transform = `translateX(${offSet}px)`;
        animation.oncancel = () => carModel.style.transform = 'translateX(0)';
        return animation;
      }
    }
  }
  async carStartRace(id: number){
    this.changeCarEngine(id, 'started').then((animation) => {
      const carItem = this.container.querySelector(`.car-item-${id}`);
      const stopBtn = carItem?.querySelector('.car-item__break');
      stopBtn?.addEventListener('click', () => {
        this.changeCarEngine(id, 'stopped').then((data) => {
          if(animation instanceof Animation && Array.isArray(data)) {
            animation.cancel();
            const [startBtn, stopBtn] = data;
            stopBtn.disabled = true;
            startBtn.disabled = false;
          }
        });
      });
      this.changeCarEngine(id, 'drive').then((data) => {
        if(Array.isArray(data) && animation instanceof Animation){
          animation.pause();
          const [startBtn, stopBtn] = data;
          stopBtn.addEventListener('click', () => {
            stopBtn.disabled = true;
            startBtn.disabled = false;
            animation.cancel();
          });
        }
      });
    });
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