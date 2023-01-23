import { GaragePage } from './GaragePage';
import { deleteWinner } from '../../API/winners/deleteWinner';
import { getCarSvg } from '../../common/utils';
import { updateCar } from '../../API/cars/updateCar';
import { Component } from '../../components/elements/Component';
import { deleteCar } from '../../API/cars/deleteCar';

export  function activeCarData(carItem: Element): [string, HTMLInputElement, HTMLInputElement]{
  const id = carItem.querySelector('.car__updates')!.getAttribute('data-id')!;
  const color = carItem.querySelector('.car-add__color')! as HTMLInputElement;
  const name = carItem.querySelector('.car-add__name')! as HTMLInputElement;
  GaragePage.state.activeCar = +id;
  GaragePage.state.activeCarColor = color.value;
  GaragePage.state.activeCarName = name.value;
  return [id, color, name];
}

export  function updateCarElement(id: string, name: HTMLInputElement, color: HTMLInputElement,
  garageCarItemsContainer: Component){
  const carItems = Array.from(garageCarItemsContainer.node.querySelectorAll('.car__item'));
  const [carEl] = carItems.filter(el =>
    el.querySelector('.car__updates')!.getAttribute('data-id') === id);
  updateCar(+id, name.value, color.value).then(() => {
    carEl.querySelector('.car__name')!.textContent = name.value;
  });
}
export  function deleteCarElement(el: Element, onclick: () => Promise<void>, garageModelContainer: Component){
  const id = el.getAttribute('data-id');
  if(id) {
    deleteCar(+id).then(() => {
      deleteWinner(+id).then();
      onclick().then();
      garageModelContainer.node.classList.add('garage__cars-container_disable');
    });
  }
}
export  function setActiveCarItem(carItem: Element, garageCarItemsContainer: Component, garageModelHolder: Component,
  garageCarTitle: Component){
  const carItemsArr = Array.from(garageCarItemsContainer.node.querySelectorAll('.car__item'));
  carItemsArr.forEach(el => el.classList.remove('car__item_active'));
  carItem.classList.add('car__item_active');
  const carName = carItem.querySelector('.car__name')!.textContent;
  const carColorValue = carItem.querySelector('.car-add__color');
  if(carColorValue instanceof  HTMLInputElement) {
    const color = carColorValue.value;
    garageModelHolder.node.innerHTML = getCarSvg(color);
    garageCarTitle.node.textContent = carName;
  }
}