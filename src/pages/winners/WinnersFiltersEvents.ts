import { WinnersPage } from './WinnersPage';
import { winnersFiltersStatus } from './winnersFiltersStatus';

export const filterChange = (e: Event) => {
  const target = e.target;
  if(target instanceof Element){
    const currentFilter = target.classList[target.classList.length - 1];
    const filterToChange = target.classList[0];
    if(WinnersPage.state.sortItem !== filterToChange) {
      WinnersPage.state.sortItem = filterToChange;
      WinnersPage.state.sortDirection = currentFilter;
    }
    const newFilter = winnersFiltersStatus[WinnersPage.state.sortDirection as keyof typeof winnersFiltersStatus];
    WinnersPage.state.sortDirection = newFilter;
    target.classList.add(newFilter);
    target.classList.remove(currentFilter);
    target.classList.add(newFilter);
  }
};