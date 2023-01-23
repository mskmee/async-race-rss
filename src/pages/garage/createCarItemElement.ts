import { Component } from '../../components/elements/Component';
import { InputComponent } from '../../components/elements/InputComponent';
import { ButtonComponent } from '../../components/elements/ButtonComponent';
import { ICarsResponse } from '../../types/interface/ICarsResponse';
import { GaragePage } from './GaragePage';

export const createCarItemElement = (el: ICarsResponse) => {
  const garageCarList = new Component({
    tag: 'div',
    className: 'car__item',
  });
  const carForm = new Component({
    tag: 'form',
    className: 'car__updates',
    parent: garageCarList,
  });
  const carTitle = new Component({
    tag: 'h3',
    textContent: `${el.name}`,
    className: 'car__name',
    parent: carForm,
  });
  const carInputLabel = new Component({
    tag: 'label',
    textContent: 'Car name',
    parent: carForm,
  });
  const carNameInput = new InputComponent({
    tag: 'input',
    className: 'car-add__name',
    type: 'text',
    value: `${el.name}`,
    parent: carForm
  });
  const colorLabel = new Component({
    tag: 'label',
    textContent: 'Car color',
    parent: carForm,
  });
  const carColorLabel = new InputComponent({
    tag: 'input',
    value: `${el.color}`,
    type: 'color',
    className: 'car-add__color',
    parent: carForm,
  });
  const updateBtn = new ButtonComponent({
    className: 'car__update-btn btn',
    type: 'submit',
    textContent: 'Update',
    parent: carForm,
  });
  const deleteBtn = new ButtonComponent({
    className: 'car__delete-btn btn',
    type: 'button',
    textContent: 'Delete',
    parent: carForm,
  });
  carForm.attribute = ['data-id', `${el.id}`];
  updateBtn.attribute = ['data-id', `${el.id}`];
  deleteBtn.attribute = ['data-id', `${el.id}`];
  if(el.id === GaragePage.state.activeCar) garageCarList.classList.add('car__item_active');
  return garageCarList;
};