import { Component } from '../../components/elements/Component';
import { InputComponent } from '../../components/elements/InputComponent';
import { ButtonComponent } from '../../components/elements/ButtonComponent';
import { createCar } from '../../API/cars/createCar';
import { generateRandomCars } from '../../API/cars/generateRandomCars';
import { GaragePage } from './GaragePage';

export class AddCarForm extends Component {
  private skipCars = 0;
  private carNameLabel = new Component({
    tag: 'label',
    textContent: 'Car name:',
    parent: this.node,
  });
  public carNameInput = new InputComponent({
    className: 'car-add__name',
    type: 'text',
    placeholder: 'Enter car name',
    name: 'car-name',
    parent: this.node,
    id: 'car-name',
    value: GaragePage.state.newCarName,
  });
  private carColorLabel = new Component({
    parent: this.node,
    tag: 'label',
    textContent: 'Car color:',
  });
  public carColorInput = new InputComponent({
    type: 'color',
    className: 'car-add__color',
    name: 'car-color',
    parent: this.node,
    id: 'car-color',
    value: GaragePage.state.newCarColor,
  });
  public addCarBtn = new ButtonComponent({
    parent: this.node,
    type: 'submit',
    textContent: 'Add',
    className: 'car-add__add-btn btn',
  });
  public generate100Cars = new ButtonComponent({
    parent: this.node,
    type: 'button',
    textContent: 'Add 100 cars',
    className: 'car-add__generate-btn btn',
    onclick: () => {
      this.generate100Cars.disabled = true;
      generateRandomCars(this.skipCars).then(() =>{
        this.skipCars += 100;
        this.generate100Cars.disabled = false;
      });
    },
  });

  constructor(parent: HTMLElement, onSubmit: () => Promise<void>) {
    super({parent: parent, tag: 'form', className: 'garage__car-add-form car-add__form'});
    this.node.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generateNewCar().then(() => {
        this.carColorInput.value = '#000000';
        this.carNameInput.value = '';
        onSubmit().then();
      });
    });
    this.generate100Cars.addEventListener('click', () => {
      onSubmit().then();
    });
    this.addListeners();
  }
  addListeners(){
    this.carNameInput.addEventListener('change', () => GaragePage.state.newCarName = this.carNameInput.value);
    this.carColorInput.addEventListener('change', () => GaragePage.state.newCarColor = this.carColorInput.value);
  }
  async generateNewCar(): Promise<void>{
    const response = await createCar(this.carNameInput.value, this.carColorInput.value);
    if(typeof response === 'string') return; //todo popUp for error
  }
}