import { createHTMLElement } from '../common/utils';

export abstract class PageComponent {
  protected readonly container: HTMLElement;
  public elementsOnScreen?: number;
  public elementsCount?: number;
  public pageNumber?: number;
  public lasPageNumber?: number;

  constructor(tag: string, classCss: string[]) {
    this.container = document.createElement(tag);
    classCss.forEach(el => this.container.classList.add(el));
  }

  createPagination(): Element{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const wrapper = createHTMLElement('div', ['pagination__wrapper']);
    const prevButton = createHTMLElement('a', ['pagination__prev', 'pagination__link'], '←');
    const nextButton = createHTMLElement('a', ['pagination__next', 'pagination__link'], '→');
    const paginationText = `page ${this.pageNumber} from ${this.lasPageNumber}`;
    if(this.pageNumber === 1){
      prevButton.classList.add('pagination__link_deactivated');
    }
    if(this.pageNumber === this.lasPageNumber){
      nextButton.classList.add('pagination__link_deactivated');
    }
    wrapper.append(prevButton, paginationText, nextButton);
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      if(this.pageNumber){
        this.pageNumber--;
        this.removePaginationWrapper();
        this.render();
      }
    });
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      if(this.pageNumber){
        this.pageNumber++;
        this.removePaginationWrapper();
        this.render();
      }
    });
    return wrapper;
  }

  removePaginationWrapper(){
    const wrapper = document.querySelector('.pagination__wrapper');
    wrapper?.remove();
  }

  render(): HTMLElement{
    return this.container;
  }
}
