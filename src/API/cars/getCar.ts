import { apiHref } from '../apiHref';
import { ICarsResponse } from '../../types/interface/ICarsResponse';

export const getCar = async(id: number): Promise<ICarsResponse| string> => {
  try {
    const response = await fetch(`${apiHref}/garage/${id}`);
    if(response.ok){
      return  await response.json();
    }
    return 'Oops! Check JSON Server. Error with get car';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};