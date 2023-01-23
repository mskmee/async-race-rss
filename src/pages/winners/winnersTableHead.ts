import { Component } from '../../components/elements/Component';
import { WinnerFilters } from '../../types/enum/WinnerFilters';
import { WinnersPage } from './WinnersPage';
import downArrow from  '../../assets/winners__down-arrow.svg';
import { ImageComponent } from '../../components/elements/ImageComponent';

export class WinnersTableHead extends Component {
  public caption = new Component({
    tag: 'caption',
    className: 'winners__title-count',
    textContent: 'Winners',
    parent: this.node,
  });
  private wins = new Component({
    tag: 'th',
    className: 'wins head__col head__filter none',
    textContent: 'Wins',
  });
  private arrowPageForId = new ImageComponent( {
    src: downArrow,
    className: 'head__filter-icon',
    alt: 'filter-arrow',
  });
  private arrowPageForTime = new ImageComponent( {
    src: downArrow,
    className: 'head__filter-icon',
    alt: 'filter-arrow',
  });
  private arrowPageForWins = new ImageComponent( {
    src: downArrow,
    className: 'head__filter-icon',
    alt: 'filter-arrow',
  });
  private time = new Component({
    tag: 'th',
    className: 'time head__col head__filter none',
    textContent: 'Best time (seconds)',
  });
  private id = new Component({
    tag: 'th',
    className: 'id head__col head__filter none',
    textContent: 'ID',
  });
  constructor(myFunc: (e: Event)=> void) {
    super({tag: 'table', className: 'winners__table table'});
    this.id.addEventListener('click', (e) => myFunc(e));
    this.wins.addEventListener('click', (e) => myFunc(e));
    this.time.addEventListener('click', (e) => myFunc(e));
    this.createHead();
    this.setActiveFilter();
  }

  createHead(){
    const head = new Component({tag: 'thead', className: 'table__head head'});
    const tr = new Component({tag: 'tr', className: 'head__row'});
    const number = new Component({tag: 'th', className: 'head__col', textContent: 'Number'});
    const carModel = new Component({tag: 'th', className: 'head__col', textContent: 'Car'});
    const carName = new Component({tag: 'th', className: 'head__col', textContent: 'Name'});
    this.id.node.appendChild(this.arrowPageForId.node);
    this.wins.node.appendChild(this.arrowPageForWins.node);
    this.time.node.appendChild(this.arrowPageForTime.node);
    tr.node.append(number.node, this.id.node, carModel.node, carName.node, this.wins.node, this.time.node);
    head.node.append(tr.node);
    this.node.append(head.node);
  }

  setActiveFilter(){
    const filter = WinnersPage.state.sortItem;
    if(filter === WinnerFilters.time){
      const prevFilter = this.time.classList[this.time.classList.length - 1];
      this.time.classList.remove(prevFilter);
      return this.time.classList.add(WinnersPage.state.sortDirection);
    }
    if(filter === WinnerFilters.id){
      const prevFilter = this.id.classList[this.id.classList.length - 1];
      this.id.classList.remove(prevFilter);
      return this.id.classList.add(WinnersPage.state.sortDirection);
    }
    if(filter === WinnerFilters.wins){
      const prevFilter = this.wins.classList[this.wins.classList.length - 1];
      this.wins.classList.remove(prevFilter);
      this.wins.classList.add(WinnersPage.state.sortDirection);
    }
  }
}