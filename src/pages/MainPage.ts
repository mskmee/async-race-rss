import { Component } from '../components/elements/Component';
import { ImageComponent } from '../components/elements/ImageComponent';
import mainLogoImg from '../assets/main__logo-img.png';
import { AnchorComponent } from '../components/elements/AnchorComponent';
import { PagesIndex } from '../types/enum/PagesIndex';

export class MainPage extends Component {
  private title = new Component({tag: 'h1', textContent: 'Welcome to async race'});
  private img = new ImageComponent({
    alt: 'main__logo',
    width: 450,
    height: 350,
    src: mainLogoImg,
  });
  private startBtn = new AnchorComponent({
    textContent: 'Start Game',
    className: 'main__href-start btn',
    onclick: () => window.location.hash = PagesIndex.race,
  });
  constructor() {
    super({tag: 'div', className: 'main__wrapper'});
    this.node.append(this.title.node, this.img.node, this.startBtn.node);
    this.node.parentElement?.classList.add('flex-jc');
  }
}