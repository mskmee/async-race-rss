import { AnchorComponent } from '../elements/AnchorComponent';
import { ImageComponent } from '../elements/ImageComponent';
import { PagesIndex } from '../../types/enum/PagesIndex';
import header from '../../assets/header__logo.svg';

export class HeaderLogo extends AnchorComponent {
  private readonly logoImg = new ImageComponent({
    src: header,
    parent: this.node,
    alt: 'header__logo',
    className: 'header__logo'
  });
  constructor(parent: HTMLElement) {
    super({parent: parent, className: 'header__logo-container', onclick: () => window.location.hash = PagesIndex.main});
  }
}