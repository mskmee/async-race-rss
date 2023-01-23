import { Component } from '../../components/elements/Component';
import { getCarSvg } from '../../common/utils';
import { ICarsFetchResponse } from '../../types/interface/ICarsFetchResponse';
import { createCarItemElement } from './createCarItemElement';
import { GaragePage } from './GaragePage';
import { activeCarData, deleteCarElement, setActiveCarItem, updateCarElement } from './activeCarFunctions';

export class GarageContainer extends Component {
  private garageCarItemsContainer = new Component({
    tag: 'div',
    className: 'garage__cars list__cars',
    parent: this.node,
  });
  private garageModelContainer = new Component({
    tag: 'div',
    className: 'garage__cars-container',
    parent: this.node,
  });
  private garageCarTitle = new Component({
    tag: 'h3',
    className: 'garage__car-mode-title',
    textContent: GaragePage.state.activeCarName,
    parent: this.garageModelContainer,
  });
  private garageModelHolder = new Component({
    tag: 'div',
    className: 'garage__car-mode-holder',
    parent: this.garageModelContainer,
    innerHTML: getCarSvg(GaragePage.state.activeCarColor),
  });
  constructor(parent: HTMLElement, onclick: ()=> Promise<void>) {
    super({parent: parent, tag: 'div', className: 'garage__container'});
    this.addListeners(onclick);
  }

  addListeners(onclick: ()=> Promise<void>){
    this.garageCarItemsContainer.addEventListener('click', (e) => {
      const target = e.target;
      if(target instanceof Element){
        const deleteBtn = target.closest('.car__delete-btn');
        const carItem = target.closest('.car__item');
        const updateBtn = target.closest('.car__update-btn');
        if(carItem) {
          const [id, color, name] = activeCarData(carItem);
          this.garageModelContainer.node.classList.remove('garage__cars-container_disable');
          setActiveCarItem(carItem, this.garageCarItemsContainer, this.garageModelHolder, this.garageCarTitle);
          if(updateBtn){
            updateCarElement(id, name, color, this.garageCarItemsContainer);
          }
          if(deleteBtn) {
            deleteCarElement(deleteBtn, onclick, this.garageModelContainer);
          }
        }
      }
    });
  }

  createCarsList(response: ICarsFetchResponse){
    this.garageCarItemsContainer.clear();
    response.data.forEach(el => {
      const item = createCarItemElement(el);
      this.garageCarItemsContainer.node.append(item.node);
    });
  }
}