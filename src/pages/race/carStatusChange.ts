import { startCarEngine } from '../../API/engine/startCarEngine';
import { stopCarEngine } from '../../API/engine/stopCarEngine';
import { driveCar } from '../../API/engine/driveCar';
import { RacePage } from './RacePage';

function addStopListener(stopBtn: HTMLButtonElement, startBtn: HTMLButtonElement,
  animation: Animation, id: number, model: SVGElement){
  stopBtn.addEventListener('click', () => stopAnimation(stopBtn, startBtn, animation, id, model));
}

const stopAnimation = (stopBtn: HTMLButtonElement, startBtn: HTMLButtonElement,
  animation: Animation, id: number, model: SVGElement) => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  animation.cancel();
  stopCarEngine(id).then(() => model.style.transform = 'translateX(0)');
};

function createAnimation(model:SVGElement, offset: number, animationTime: number,
  startCar: HTMLButtonElement, stopCar: HTMLButtonElement, id: number){
  const animation = model.animate([
    { transform: 'translateX(0)'},
    { transform: `translateX(${offset}px)`},
  ], {
    duration: animationTime,
  });
  RacePage.state.animationsArr.push(animation);
  animation.id = `${id}`;
  animation.onfinish = () => {
    model.style.transform = `translateX(${offset}px)`;
    startCar.disabled = false;
    stopCar.disabled = true;
  };
  animation.oncancel = () => model.style.transform = 'translateX(0)';
  return animation;
}

export const startCarAnimation = async (id: number, model: SVGElement, startCar: HTMLButtonElement,
  stopCar: HTMLButtonElement, offset: number) => {
  const response = await startCarEngine(id);
  if(typeof response === 'string') return 'err'; //TODO Err
  const animationTime = Math.round(response.distance / response.velocity);
  const animation = createAnimation(model, offset, animationTime, startCar, stopCar, id);
  addStopListener(stopCar, startCar, animation, id, model);
  const isBroken = await driveCar(id);
  if(typeof isBroken === 'string') return 'err';//TODO err
  if(isBroken.broken) animation.pause();
  return animation;
};