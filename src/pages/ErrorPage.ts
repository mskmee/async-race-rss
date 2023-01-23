import { Component } from '../components/elements/Component';
import { ImageComponent } from '../components/elements/ImageComponent';
import { AnchorComponent } from '../components/elements/AnchorComponent';
import { PagesIndex } from '../types/enum/PagesIndex';
import image from '../assets/404 img.png';
export class ErrorPage extends Component {
  private img = new ImageComponent({
    src: image,
    alt: '404__img',
    className: 'error__icon'
  });
  private title = new Component({
    tag: 'h1',
    className: 'error__text',
    textContent: 'The page you are looking for does not exist or has been moved.'
  });
  private btn = new AnchorComponent({
    textContent: 'Go to Home Page',
    className: 'error__btn btn',
    onclick: () => window.location.hash = PagesIndex.main,
  });
  constructor() {
    super({tag: 'div', className: 'error__wrapper'});
    this.node.append(this.img.node, this.title.node, this.btn.node);
  }
}