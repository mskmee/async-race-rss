import { createHTMLElement } from '../common/utils';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MainPage } from '../pages/MainPage';
import { PageComponent } from '../templates/PageComponent';
import { GaragePage } from '../pages/GaragePage';
import { RacePage } from '../pages/RacePage';
import { WinnersPage } from '../pages/WinnersPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export class App {
  private  page?: PageComponent;
  constructor() {
  }
  router(){
    const appContainer = document.querySelector('main');
    const href = window.location.href;
    const pageIndex = href.split('#')[1];
    if(appContainer){
      if(pageIndex === '' || typeof pageIndex === 'undefined'){
        this.page = new MainPage('div', ['main__wrapper']);
        appContainer.classList.add('flex', 'flex-c');
        appContainer.classList.remove('flex-d-c', 'flex-a-c');
      }else if(pageIndex === 'garage'){
        this.page = new GaragePage('div', ['garage__wrapper'], GaragePage.pageCount);
        appContainer.classList.add('flex', 'flex-d-c');
        appContainer.classList.remove('flex-c', 'flex-a-c');
      } else if(pageIndex === 'race'){
        this.page = new RacePage('div', ['race__wrapper'], RacePage.pageCount);
        appContainer.classList.add('flex', 'flex-d-c');
        appContainer.classList.remove('flex-c', 'flex-a-c');
      } else if(pageIndex === 'winners') {
        this.page = new WinnersPage('div', ['winners__wrapper'], WinnersPage.pageCount);
        appContainer.classList.add('flex', 'flex-d-c', 'flex-a-c');
        appContainer.classList.remove('flex-c');
      } else {
        this.page = new NotFoundPage('div', ['error__wrapper']);
        appContainer.classList.add('flex', 'flex-c');
        appContainer.classList.remove('flex-d-c', 'flex-a-c');
      }
      appContainer.innerHTML = '';
      appContainer.append(this.page.render());
    }
  }
  run(){
    const appContainer = document.querySelector('.app');
    if(appContainer){
      window.addEventListener('load', this.router);
      window.addEventListener('hashchange', this.router);
      const header = new Header('header', ['header__wrapper']);
      const footer = new Footer('footer', ['footer__wrapper']);
      const main = createHTMLElement('main', ['container', 'app']);
      appContainer.append(header.render(), main, footer.render());
    }
  }
}