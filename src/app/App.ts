import { MainComponent } from '../components/elements/MainComponent';
import { Header } from '../components/header/Header';
import { Footer } from '../components/Footer';
import { SectionComponent } from '../components/elements/SectionComponent';
import { Router } from '../utils/router';
import { Component } from '../components/elements/Component';
import { PageIdsTypes } from '../types/types/PageIdsTypes';
import { IPageIds } from '../types/interface/IPageIds';
import { MainPage } from '../pages/MainPage';
import { ErrorPage } from '../pages/ErrorPage';
import { WinnersPage } from '../pages/winners/WinnersPage';
import { GaragePage } from '../pages/garage/GaragePage';
import { RacePage } from '../pages/race/RacePage';

export class App extends MainComponent {
  private page?: Component;
  private header = new Header(this.node);
  private app = new SectionComponent({
    className: 'main container unselectable',
    parent: this.node,
  });
  private footer = new Footer(this.node);
  private router = new Router();
  private pageIds: IPageIds = {
    'main': new MainPage(),
    'race': new RacePage(),
    '404': new ErrorPage(),
  };
  constructor(parent: HTMLElement) {
    super(parent, {className: 'wrapper container'});
    this.events();
  }
  createMainPage(id: PageIdsTypes){
    this.page?.destroy();
    switch (id){
    case 'main':
      this.page = this.pageIds[id];
      break;
    case 'winners':
      this.page = new WinnersPage();
      break;
    case '404':
      this.page = this.pageIds[id];
      break;
    case 'garage':
      this.page = new GaragePage();
      break;
    case 'race':
      this.page = this.pageIds[id];
      break;
    }
    if(this.page) this.app.node.append(this.page.node);
  }

  events(){
    window.addEventListener('load', () => this.createMainPage(this.router.createPageIndex()));
    window.addEventListener('hashchange', () => this.createMainPage(this.router.createPageIndex()));
  }

  run(){
    this.events();
  }
}