import { PageIdsTypes } from '../types/types/PageIdsTypes';

export class Router {
  private pageIds = ['main', '404', 'winners', 'garage', 'race'];
  constructor() {
  }

  createPageIndex(): PageIdsTypes{
    const href = window.location.hash;
    const pageIndex = href.split('#')[1];
    if(typeof pageIndex === 'undefined') return 'main';
    // key of or something???
    if(this.pageIds.includes(pageIndex)) return <'main' | 'race' | 'winners' | 'garage' | '404'>pageIndex;
    return '404';
  }
}