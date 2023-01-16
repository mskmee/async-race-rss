import { PageComponent } from '../templates/PageComponent';
import { headerLogo } from '../common/svgIcons';

export class Header extends PageComponent{
  constructor(tag: string, cssClassArr: string[]) {
    super(tag, cssClassArr);
  }

  addEventListeners(){
    const headerLogo = this.container.querySelector('.header__logo');
    const garageHref = this.container.querySelector('.header__href-garage');
    const winnersHref = this.container.querySelector('.header__href-winners');
    const raceHref = this.container.querySelector('.header__href-race');
    if(headerLogo && garageHref && winnersHref && raceHref){
      garageHref.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'garage';
      });
      headerLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
      });
      winnersHref.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'winners';
      });
      raceHref.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'race';
      });

    }
  }

  createElement(){
    const headerBlock = `
     <a href="#" class="header__logo-container">
      ${headerLogo}
     </a>
     <div class="header__btns">
      <a href="#race" class="header__href header__href-race">Race</a>
      <a href="#garage" class="header__href header__href-garage">Garage</a>
      <a href="#winners" class="header__href header__fref-winners">Winners</a>
     </div>
    `;
    this.container.innerHTML = headerBlock;
  }

  render(): HTMLElement {
    this.createElement();
    this.addEventListeners();
    return super.render();
  }
}