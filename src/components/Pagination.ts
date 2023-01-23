import { Component } from './elements/Component';
import { AnchorComponent } from './elements/AnchorComponent';

export class Pagination extends Component{
  public prevBtn = new AnchorComponent({
    className: 'pagination__prev pagination__link',
    textContent: '←',
    onclick: () => {
      this.currentPage--;
      this.render();
    },
    parent: this.node,
  });
  private paginationText = new Component({
    tag: 'span',
    className: 'pagination__text',
    parent: this.node,
  });
  public nextBtn = new AnchorComponent({
    textContent: '→',
    className: 'pagination__next pagination__link',
    onclick: () => {
      this.currentPage++;
      this.render();
    },
    parent: this.node
  });
  private currentPage: number;
  private lastPage: number;
  constructor(prevBtnClick: () => void, nextBtnClick: () => void, currentPage: number, lastPage: number) {
    super({tag: 'div', className: 'pagination__wrapper'});
    this.currentPage = currentPage ?? 1;
    this.lastPage = lastPage;
    this.nextBtn.addEventListener('click', nextBtnClick);
    this.prevBtn.addEventListener('click', prevBtnClick);
    this.render();
  }

  render(){
    this.currentPage === 1 ? this.prevBtn.classList.add('pagination__link_deactivated')
      : this.prevBtn.classList.remove('pagination__link_deactivated');
    this.currentPage === this.lastPage ? this.nextBtn.classList.add('pagination__link_deactivated')
      : this.nextBtn.classList.remove('pagination__link_deactivated');
    this.paginationText.node.textContent = `${this.currentPage} from ${this.lastPage}`;
  }

  updateElement(lastPage: number){
    if(this.lastPage === lastPage || lastPage === 0) return;
    this.lastPage = lastPage;
    this.render();
  }
}