import { PageComponent } from '../templates/PageComponent';
import { fetchData } from '../API/index';
import { ICarResponse } from '../types/interface/ICarResponse';
import { PopUp } from '../components/PopUp';
import { createHTMLElement, getCarSvg } from '../common/utils';
import { ICarsGenerationResponse } from '../types/interface/ICarsGenerationResponse';

export class GaragePage extends PageComponent {
  static pageCount?: number;
  private popUp: PopUp;
  private skipCars: number;
  private carGenerating: boolean;
  constructor(tag: string, cssClass: string[], pageNumber?: number) {
    super(tag, cssClass);
    this.skipCars = 0;
    this.popUp = new PopUp('div', ['pop-up__info']);
    if(pageNumber){
      this.pageNumber = pageNumber;
    }else {
      this.pageNumber = 1;
    }
    this.elementsOnScreen = 7;
    this.elementsCount = 7;
    this.carGenerating = false;
    this.lasPageNumber = 1;
  }

  createPagination(): Element {
    return super.createPagination();
  }

  async gatherData() {
    const response = await fetchData(`/garage?_limit=${this.elementsOnScreen}&_page=${this.pageNumber}`);
    if(typeof response === 'string' || !response.ok){
      const errorMessage = '<div class="error error__message">Oops we got error. Please check JSON Server</div>';
      return this.container.innerHTML = errorMessage;
    }
    const garageCarsCount = response.headers.get('x-total-count');
    if(garageCarsCount && this.elementsOnScreen){
      this.elementsCount = +garageCarsCount;
      this.lasPageNumber = Math.ceil(this.elementsCount / this.elementsOnScreen);
    }
    const garageCarsCountTitle = createHTMLElement('h2', ['garage__title-count'], `Garage(${garageCarsCount} cars)`);
    const garageCarList = this.container.querySelector('.garage__cars-list');
    if(garageCarList) garageCarList.prepend(garageCarsCountTitle);
    const data: ICarResponse[] = await response.json();
    const carsList = this.container.querySelector('.list__cars');
    while (carsList?.firstChild){
      carsList.removeChild(carsList.firstChild);
    }
    if(carsList){
      data.forEach((car, index) => {
        const data = `
          <div class="car__item">
            <form data-id="${car.id}" class="car__updates">
            <h3 class="car__name">${car.name}</h3>
            <label for="name">Car name</label>
            <input class="car-add__name" id="name" type="text" value="${car.name}">
            <label for="color">Car color</label>
            <input class="car-add__color" id="color" type="color" value="${car.color}">
              <button data-id="${car.id}" class="car__update-btn btn" type="submit">Update</button>
              <button data-id="${car.id}" class="car__delete-btn btn" type="button">Delete</button>
            </form>
          </div>
        `;
        carsList.innerHTML += data;
      });
      const firstElement = carsList.querySelector('.car__item');
      const carBlock = this.container.querySelector('.garage__cars-container');
      const colorBlock = firstElement?.querySelector('.car-add__color');
      const carName = firstElement?.querySelector('.car__name');
      if(firstElement && carBlock && colorBlock && carName){
        firstElement.classList.add('car__item_active');
        if(colorBlock instanceof HTMLInputElement) carBlock.innerHTML += `
        <h3 class='garage__car-mode-title'>${carName.textContent}</h3>
        ${getCarSvg(colorBlock.value)}
        `;
      }
    }
  }
  createElements(){
    const garageBlock = `
    <div class="garage__cars-list">
      <h3 class="garage__car-add-title">Add new car:</h3>
      <form class="garage__car-add-form car-add__form" action="">
        <label for="name">Car name</label>
        <input class="car-add__name" id="name" type="text" placeholder="">
        <label for="color">Car color</label>
        <input class="car-add__color" id="color" type="color">
        <button class="car-add__add-btn btn" type="submit">Add</button>
        <button type="button" class="car-add__generate-btn btn">Add 100 cars</button>
      </form>
      <div class="garage__cars list__cars"></div>
    </div>
    <div class="garage__cars-container">
    </div>
    `;
    this.container.innerHTML = garageBlock;
  }

  addEventsListeners(){
    const addNewCarForm = this.container.querySelector('.car-add__form');
    if(addNewCarForm) {
      addNewCarForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        if(!this.popUp.isActive){
          const carNameInput = addNewCarForm.querySelector('.car-add__name');
          const carColorInput = addNewCarForm.querySelector('.car-add__color');
          if(carColorInput instanceof HTMLInputElement && carNameInput instanceof HTMLInputElement){
            if(carNameInput.value === ''){
              return this.container.append(this.popUp.createPopUp('warning', 'Please enter car name'));
            } else {
              this.addCar(carNameInput.value, carColorInput.value).then((value) => {
                value === 'warning' ? this.container.append(this.popUp.createPopUp('warning', 'Oops! We gon error with creating car.'))
                  : this.container.append(this.popUp.createPopUp('success', 'The car was successful add'));
              });
              this.removePaginationWrapper();
              this.render();
            }
          }
        }
      });

      const generateCarsBtn = addNewCarForm.querySelector('.car-add__generate-btn');
      if(generateCarsBtn){
        generateCarsBtn.addEventListener('click', () => {
          if(!this.carGenerating && !this.popUp.isActive){
            this.carGenerating = true;
            this.generateCars().then((data) => {
              this.skipCars += 100;
              if(typeof data === 'string'){
                this.carGenerating = false;
                return this.container.append(this.popUp.createPopUp('warning', 'Oops! We gon error with generating cars.'));
              }
              const promiseArr: Promise<string>[] = [];
              data.results.forEach(el => {
                const model = `${el.Make} ${el.Model} ${el.Year} year`;
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                promiseArr.push(this.addCar(model, `#${randomColor}`));
              });
              Promise.all(promiseArr).then((value) => {
                if(value.some(el => el === 'warning')) {
                  this.carGenerating = false;
                  return this.container.append(this.popUp.createPopUp('warning', 'Oops! We gon error with generating cars.'));
                }
                this.carGenerating = false;
                this.removePaginationWrapper();
                this.render();
                return this.container.append(this.popUp.createPopUp('success', 'Cars were generated'));
              });
            });
          }
        });
      }
    }

    const allForms = this.container.querySelectorAll('.car__updates');
    for(let i = 0; i < allForms.length; i++){
      allForms[i].addEventListener('submit', (e) => {
        e.preventDefault();
        const id = allForms[i].getAttribute('data-id');
        const carNameInput = allForms[i].querySelector('.car-add__name');
        const carColorInput = allForms[i].querySelector('.car-add__color');
        if(id && carNameInput instanceof HTMLInputElement && carColorInput instanceof  HTMLInputElement){
          this.updateCarInfo(id, carNameInput.value, carColorInput.value).then();
        }
      });
    }

    const listCars = this.container.querySelector('.list__cars');
    if(listCars) {
      listCars.addEventListener('click', (e) => {
        const target = e.target;
        if(target instanceof Element){
          const deleteBtn = target.closest('.car__delete-btn');
          const carItem = target.closest('.car__item');
          if(deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            if(id) {
              this.removeCar(id).then();
            }
          }
          if(carItem) {
            this.setActiveCarItem(carItem);
          }
        }
      });
    }
    const [prevBtn, nextBtn] = Array.from(document.querySelectorAll('.pagination__link'));
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        GaragePage.pageCount = this.pageNumber;
      });
      nextBtn.addEventListener('click', () => {
        GaragePage.pageCount = this.pageNumber;
      });
    }
  }

  removePaginationWrapper() {
    super.removePaginationWrapper();
  }

  setActiveCarItem(carItem: Element){
    const carItems = this.container.querySelectorAll('.car__item');
    const carItemsArr = Array.from(carItems);
    carItemsArr.forEach(el => el.classList.remove('car__item_active'));
    carItem.classList.add('car__item_active');
    const carName = carItem.querySelector('.car__name')?.textContent;
    const carColorValue = carItem.querySelector('.car-add__color');
    if(carColorValue instanceof  HTMLInputElement){
      const color = carColorValue.value;
      const carModel = getCarSvg(color);
      const carModelBlock = this.container.querySelector('.garage__cars-container');
      if(carModelBlock){
        const data = `
        <h3 class='garage__car-mode-title'>${carName}</h3>
        ${carModel}
        `;
        carModelBlock.innerHTML = data;
      }
    }
  }

  async removeCar(id: string) {
    const response = await fetchData(`/garage/${id}`, 'DELETE');
    if(response instanceof  Response && response.ok){
      if(!this.popUp.isActive){
        this.removePaginationWrapper();
        this.render();
        return this.container.append(this.popUp.createPopUp('success', `Car was delete`));
      }
      return;
    }else {
      return this.container.append(this.popUp.createPopUp('warning', 'Oops! We got error with delete'));
    }
  }

  async updateCarInfo(id: string, carName: string, carColor: string): Promise<void>{
    const response = await fetchData(`/garage/${id}`, 'PUT', {name: carName, color: carColor});
    if(response instanceof  Response && response.ok){
      if(!this.popUp.isActive){
        this.removePaginationWrapper();
        this.render();
        return this.container.append(this.popUp.createPopUp('success', `${carName} was update`));
      }
      return; 
    }else {
      return this.container.append(this.popUp.createPopUp('warning', 'Oops! We got error with update'));
    }
  }

  async generateCars(): Promise<string | ICarsGenerationResponse>{
    try {
      const headers = {
        'X-Parse-Application-Id': 'ZlQJyoFKLeH8ulGAeVckevg3DOZWScu8v7FKHL3B',
        'X-Parse-REST-API-Key': 'BfcHpR6H1mcm6pGzLrqI3bvG05PfMPCjf5fGf2Fl'
      };
      const response = await fetch(`https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?skip=${this.skipCars}&excludeKeys=Category`,
        {headers: headers});
      const data = await response.json();
      return data;
    } catch (e) {
      return `Oops! Error ${e}`;
    }
  }
  async addCar(carName: string, color: string): Promise<string> {
    const response = await fetchData('/garage', 'POST', {name: carName, color: color});
    if(typeof response === 'string' || !response.ok){
      return 'warning';
    }
    return 'success';
  }
  render(): HTMLElement {
    this.createElements();
    this.gatherData().then(() => {
      this.container.after(this.createPagination());
      this.addEventsListeners();
    });
    return super.render();
  }
}