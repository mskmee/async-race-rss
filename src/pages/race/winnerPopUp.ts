import { Component } from '../../components/elements/Component';
import { getCar } from '../../API/cars/getCar';
import { getCarSvg } from '../../common/utils';

export const winnerPopUp = async (id: number, time: number) => {
  const carData = await getCar(id);
  if(typeof carData === 'string') return;
  const wrapper = new Component({
    tag: 'div',
    className: 'pop-up unselectable',
  });
  const container = new Component({
    tag: 'div',
    className: 'pop-up__container',
    parent: wrapper,
  });
  const text = new Component({
    tag: 'h2',
    className: 'pop-up__title',
    parent: container,
    textContent: `Winner is ${carData.name}! His time is ${time}s`
  });
  const carImgWrapper = new Component({
    tag: 'div',
    className: 'pop-up__car-wrapper',
    innerHTML: getCarSvg(carData.color),
    parent: container,
  });
  wrapper.addEventListener('click', () => wrapper.destroy());
  document.body.append(wrapper.node);
};