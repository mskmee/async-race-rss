import { apiHref } from '../apiHref';
import { ICarsResponse } from '../../types/interface/ICarsResponse';
import { headers } from '../headers';
import { FetchStatusCodes } from '../../types/enum/fetchStatusCodes';

export const createCar = async(carName: string, color: string): Promise<ICarsResponse| string> => {
  const body = {
    name: carName,
    color: color
  };
  try {
    const response =
      await fetch(`${apiHref}/garage/`, {method: 'POST', headers: headers, body: JSON.stringify(body)});
    if(response.ok && response.status === FetchStatusCodes.objectCreated){
      return await response.json();
    }
    return 'Oops! Check JSON Server. Error with create car';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};