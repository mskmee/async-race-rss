import { PageComponent } from '../templates/PageComponent';
import { popUpInfoLogo, popUpSuccessLogo, popUpWarningLogo } from '../common/svgIcons';

export class PopUp extends PageComponent {
  public isActive: boolean;
  constructor(tag: string, cssClass: string[]) {
    super(tag, cssClass);
    this.isActive = false;
  }

  createPopUp(type: string, text: string){
    switch (type) {
    case 'info':
      this.container.innerHTML += popUpInfoLogo;
      break;
    case 'warning':
      this.container.innerHTML += popUpWarningLogo;
      break;
    case 'success':
      this.container.innerHTML += popUpSuccessLogo;
      break;
    }
    setTimeout(() => {
      this.container.classList.add('pop-up__info_active');
      this.isActive = true;
    }, 1);
    const popUpData = `<h3 class="info__title">${text}</h3>`;
    this.container.innerHTML += popUpData;
    this.container.addEventListener('click', () => this.container.remove());
    setTimeout(() => this.container.classList.remove('pop-up__info_active'), 1000);
    setTimeout(() => {
      while(this.container.firstChild){
        this.container.removeChild(this.container.firstChild);
      }
      this.container.remove();
      this.isActive = false;
    }, 1300);
    return this.container;
  }
}