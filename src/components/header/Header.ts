import { Component } from '../elements/Component';
import { HeaderLogo } from './HeaderLogo';
import { HeaderBtns } from './HeaderBtns';

export class Header extends Component {
  private headerLogo = new HeaderLogo(this.node);
  private headerBtns = new HeaderBtns(this.node);
  constructor(parent: HTMLElement) {
    super({parent: parent, tag: 'header', className: 'header__wrapper unselectable'});
  }
}