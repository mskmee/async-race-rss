import { apiHref } from '../apiHref';
import { IWinnersResponse } from '../../types/interface/IWinnersResponse';

export const getWinner = async(id:number): Promise <IWinnersResponse | string> => {
  try {
    const response = await fetch(`${apiHref}/winners/${id}`);
    if(response.ok){
      return  await response.json();
    }
    return 'Oops! Check JSON Server. Error with get winner';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};