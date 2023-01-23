import { ButtonComponent } from '../../components/elements/ButtonComponent';
import { CreateRaceField } from './CreateRaceField';
import { IRaceMember } from '../../types/interface/IRaceMember';
import { RacePage } from './RacePage';
import { startCarEngine } from '../../API/engine/startCarEngine';
import { startCarAnimation } from './carStatusChange';
import { stopCarEngine } from '../../API/engine/stopCarEngine';
import { createWinner } from '../../API/winners/createWinner';
import { winnerPopUp } from './winnerPopUp';

export const raceStart = async (e: MouseEvent, stopBtn: ButtonComponent, raceField: CreateRaceField) => {
  const startBtn = e.target as HTMLButtonElement;
  startBtn.disabled = true;
  RacePage.state.isRace = true;
  RacePage.state.animationsArr = [];
  RacePage.state.raceMembers = getRaceMembersItems(raceField);
  raceAnimationStart(stopBtn, startBtn).then();
};

const raceAnimationStart = async (stopBtn: ButtonComponent, startBtn: HTMLButtonElement) => {
  const millisecondsInSecond = 1000;
  const raceMembersId = RacePage.state.raceMembers.map(el => startCarEngine(el.id));
  await Promise.all(raceMembersId);
  RacePage.state.raceMembers.map( async (el) => {
    el.startBtn.disabled = true;
    el.stopBtn.disabled = false;
    const offset = (el.hr.clientWidth - el.model.clientWidth) + 50;
    await startCarAnimation(el.id, el.model, el.startBtn, el.stopBtn, offset);
    if(RacePage.state.animationsArr.length === RacePage.state.raceMembers.length && RacePage.state.isRace){
      RacePage.state.isRace = false;
      const winner = await Promise.race(RacePage.state.animationsArr.map(animation => animation.finished));
      const winnerTimeInSeconds = winner.currentTime! / millisecondsInSecond;
      stopBtn.disabled = false;
      stopBtn.addEventListener('click', () => raceStop(stopBtn, startBtn));
      await winnerPopUp(+winner.id, winnerTimeInSeconds);
      await createWinner(+winner.id, winnerTimeInSeconds);
    }
  });
};

export const raceStop = async (stopBtn: ButtonComponent, startBtn: HTMLButtonElement) => {
  await RacePage.state.animationsArr.forEach(el => {
    stopCarEngine(+el.id);
    el.cancel();
  });
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

const getRaceMembersItems = (raceField: CreateRaceField): IRaceMember[] => {
  const membersArr: IRaceMember[] = [];
  const raceMembersItems = raceField.node.querySelectorAll('.car-item');
  raceMembersItems.forEach(el => {
    const id = +el.id;
    const model = el.querySelector('.car__icon') as SVGElement;
    const startBtn = el.querySelector('.car-item__engage') as HTMLButtonElement;
    const stopBtn = el.querySelector('.car-item__break') as HTMLButtonElement;
    const road = el.querySelector('hr') as HTMLHRElement;
    membersArr.push({
      id: id,
      model: model,
      stopBtn: stopBtn,
      startBtn: startBtn,
      hr: road
    });
  });
  return membersArr;
};