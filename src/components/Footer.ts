import { Component } from './elements/Component';
import { AnchorComponent } from './elements/AnchorComponent';

export class Footer extends Component {
  private readonly footerLogo = new Component({className: 'footer__school-logo unselectable', tag: 'div', parent: this.node});
  private readonly schoolHref = new AnchorComponent({
    className: 'footer__href',
    parent: this.footerLogo,
    href: 'https://rs.school/js/',
    target: '_blank',
    textContent: 'RSSchool',
  });
  private readonly productionYear = new Component({className: 'footer__year', textContent: '2023', parent: this});
  private readonly gitHref = new AnchorComponent({
    className: 'footer__href',
    href: 'https://github.com/mskmee',
    target: '_blank',
    textContent: '@mskmee',
    parent: this,
  });
  constructor(parent: HTMLElement) {
    super({parent: parent, tag: 'header', className: 'footer__wrapper'});
  }
}