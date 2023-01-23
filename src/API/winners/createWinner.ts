import { apiHref } from '../apiHref';
import { IWinnersResponse } from '../../types/interface/IWinnersResponse';
import { headers } from '../headers';
import { FetchStatusCodes } from '../../types/enum/fetchStatusCodes';
import { getWinner } from './getWinner';
import { updateWinner } from './updateWinner';

export const createWinner = async(id:number, time: number): Promise <IWinnersResponse | string> => {
  const body = {
    id: id,
    wins: 1,
    time: time
  };
  try {
    const response = await fetch(`${apiHref}/winners`,
      {method: 'POST', headers: headers, body: JSON.stringify(body)});
    if(response.ok && response.status === FetchStatusCodes.objectCreated) return await response.json();
    if(response.status === FetchStatusCodes.winnerExist) {
      const winnerData = await getWinner(id);
      if(typeof winnerData === 'string') throw Error;
      const lowerTime = winnerData.time > time ? time : winnerData.time;
      const winsNumber = ++winnerData.wins;
      const update = await updateWinner(id, winsNumber, lowerTime);
      return update;
    }
    return 'Oops! Check JSON Server. Error with create winner';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};