import { Component } from '../../components/elements/Component';
import { ButtonComponent } from '../../components/elements/ButtonComponent';
import { raceStart, raceStop } from './raceStatusChange';
import { CreateRaceField } from './CreateRaceField';

export class ControlContainer extends Component{
  title = new Component({
    parent: this.node,
    tag: 'h1',
    textContent: 'Race',
  });
  private startRaceBtn = new ButtonComponent({
    className: 'race-control__btn btn race-control__start',
    parent: this.node,
    textContent: 'Start Race',
    disabled: false,
  });
  private stopRaceBtn = new ButtonComponent({
    className: 'race-control__btn btn race-control__break',
    parent: this.node,
    textContent: 'Stop Race',
    disabled: true,
  });
  constructor(parent: HTMLElement, raceField: CreateRaceField) {
    super({parent: parent, tag: 'div', className: 'race-control'});
    this.startRaceBtn.addEventListener('click', (e) => raceStart(e, this.stopRaceBtn, raceField));
  }
}