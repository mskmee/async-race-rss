import { apiHref } from '../apiHref';
import { IWinnersResponse } from '../../types/interface/IWinnersResponse';
import { headers } from '../headers';

export const updateWinner = async(id:number, wins: number, time: number): Promise <IWinnersResponse | string> => {
  const body = {
    wins: wins,
    time: time,
  };
  try {
    const response = await fetch(`${apiHref}/winners/${id}`,
      {method: 'PUT', headers: headers, body: JSON.stringify(body)});
    if(response.ok){
      return await response.json();
    }
    return 'Oops! Check JSON Server. Error with update winner';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};