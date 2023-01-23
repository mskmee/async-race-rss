import { apiHref } from '../apiHref';
import { ICarsResponse } from '../../types/interface/ICarsResponse';
import { ICarsFetchResponse } from '../../types/interface/ICarsFetchResponse';

export const getCars = async(pageNum: number, limitOnPage: number): Promise<ICarsFetchResponse| string> => {
  try {
    const response = await fetch(`${apiHref}/garage?_page=${pageNum}&_limit=${limitOnPage}`);
    if(response.ok){
      const winnersQuantity = response.headers.get('x-total-count');
      const data: ICarsResponse [] = await response.json();
      return {
        totalCount: +winnersQuantity!,
        data: data,
      };
    }
    return 'Oops! Check JSON Server. Error with get cars';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};