import { apiHref } from '../apiHref';
import { IWinnersResponse } from '../../types/interface/IWinnersResponse';
import { IWinnersFetchResponse } from '../../types/interface/IWinnersFetchResponse';

export const getWinners = async(pageNum: number, limitOnPage: number, sort = '', order = '')
  : Promise<IWinnersFetchResponse | string> => {
  try {
    const response =
      await fetch(`${apiHref}/winners?_page=${pageNum}&_limit=${limitOnPage}&_sort=${sort}&_order=${order}`);
    if(response.ok){
      const winnersQuantity = response.headers.get('x-total-count');
      const data: IWinnersResponse [] = await response.json();
      return {
        totalCount: +winnersQuantity!,
        data: data
      };
    }
    return 'Oops! Check JSON Server. Error with get winners';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};