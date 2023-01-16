import { PageComponent } from '../templates/PageComponent';
import { notFoundPageLogo } from '../common/svgIcons';

export class NotFoundPage extends PageComponent{

  constructor(tag: string, cssClass: string[]) {
    super(tag, cssClass);
  }

  createErrorPage(){
    const errorPageBlock = `
      ${notFoundPageLogo}
      <h2 class="error__title">Page not found</h2>
      <p class="error__text">The page you are looking for does not exist or has been moved.</p>
      <a href="#" class="error__btn btn">Go to Home Page</a>
    `;
    this.container.innerHTML = errorPageBlock;
  }

  addEventListeners() {
    const errorBtn = this.container.querySelector('.error__btn');
    if(errorBtn){
      errorBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
      });
    }
  }

  render(): HTMLElement {
    this.createErrorPage();
    this.addEventListeners();
    return this.container;
  }
}