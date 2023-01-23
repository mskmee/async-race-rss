import { Component } from '../elements/Component';
import { AnchorComponent } from '../elements/AnchorComponent';
import { PagesIndex } from '../../types/enum/PagesIndex';

export class HeaderBtns extends Component{
  private readonly race = new AnchorComponent({
    parent: this.node,
    className: 'header__href',
    onclick: () => window.location.hash = PagesIndex.race,
    textContent: 'Race'
  });
  private readonly garage = new AnchorComponent({
    parent: this.node,
    className: 'header__href',
    onclick: () => window.location.hash = PagesIndex.garage,
    textContent: 'Garage'
  });
  private readonly winners = new AnchorComponent({
    parent: this.node,
    className: 'header__href',
    onclick: () => window.location.hash = PagesIndex.winners,
    textContent: 'Winners'
  });
  constructor(parent: HTMLElement) {
    super({parent: parent, className: 'header__btns', tag: 'div'});
  }
}