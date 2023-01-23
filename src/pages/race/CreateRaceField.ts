import { Component } from '../../components/elements/Component';
import { ICarsFetchResponse } from '../../types/interface/ICarsFetchResponse';
import { ButtonComponent } from '../../components/elements/ButtonComponent';
import { getCarSvg } from '../../common/utils';
import { startCarAnimation } from './carStatusChange';

export class CreateRaceField extends Component {
  constructor() {
    super({tag: 'div', className: 'race__field'});
  }

  createCarTrack(response: ICarsFetchResponse){
    this.clear();
    response.data.forEach(el => {
      const raceWrapper = new Component({
        tag: 'div',
        className: `race__car-item car-item car-item-${el.id}`,
        id: `${el.id}`,
        parent: this.node,
      });
      const carTitle = new Component({
        tag: 'h3',
        className: 'car-item__name',
        textContent: el.name,
        parent: raceWrapper,
      });
      const carWrapper = new Component({
        tag: 'div',
        className: 'car-item__icon-wrapper',
        parent: raceWrapper,
      });
      const btnsForm = new Component({
        tag: 'form',
        className: 'car-item__form',
        parent: carWrapper
      });
      const startCar = new ButtonComponent({
        className: 'car-item__engage btn car-item__btn',
        parent: btnsForm,
        textContent: 'A',
        disabled: false,
        type: 'button',
        id: `${el.id}`,
      });
      const stopCar = new ButtonComponent({
        className: 'car-item__break btn car-item__btn',
        parent: btnsForm,
        textContent: 'B',
        disabled: true,
        type: 'button',
        id: `${el.id}`,
      });
      const carModelWrapper = new Component({
        tag: 'div',
        className: 'car__model-wrapper',
        parent: carWrapper,
        innerHTML: getCarSvg(el.color),
      });
      const hr = new Component({
        tag: 'hr',
        className: 'car-item__road',
        parent: raceWrapper
      });
      const model = carModelWrapper.node.querySelector('.car__icon') as SVGElement;
      startCar.addEventListener('click', () => {
        stopCar.disabled = false;
        startCar.disabled = true;
        const offset = (hr.node.clientWidth - model.clientWidth) + 50;
        startCarAnimation(el.id, model, startCar.node, stopCar.node, offset).then();
      });
    });
  }
}