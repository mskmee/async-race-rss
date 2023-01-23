import { Component } from '../../components/elements/Component';

export class WinnersErrorComponent extends Component {
  public errorMessage = new Component({
    tag: 'td',
    textContent: 'Oops! We got error with taking data. Please check JSON server.',
    className: 'table__error-message',
    parent: this.node,
  });
  constructor() {
    super({tag: 'tr', className: 'error table__error'});
    this.errorMessage.node.setAttribute('colspan', '7');
  }
}