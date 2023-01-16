import { PageComponent } from '../templates/PageComponent';
import mainLogoImg from '../assets/main__logo-img.png';
export class MainPage extends PageComponent{
  constructor(tag: string, cssClassList: string[]) {
    super(tag, cssClassList);
  }

  createElement(){
    const mainBlock = `
    <h1 class="main__title">Welcome to async race</h1>
    <img class="main__logo" alt="main__logo">
    <a href="#" class="main__href-start btn">Start Game</a>
    `;
    this.container.innerHTML = mainBlock;
  }

  addEventsListeners(){
    const mainHref = this.container.querySelector('.main__href-start');
    if(mainHref){
      mainHref.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'race';
      });
    }
    const mainLogo = this.container.querySelector('.main__logo');
    if(mainLogo instanceof HTMLImageElement) {
      mainLogo.width = 450;
      mainLogo.height = 400;
      mainLogo.src = mainLogoImg;
    }
  }

  render(): HTMLElement {
    this.createElement();
    this.addEventsListeners();
    return super.render();
  }
}