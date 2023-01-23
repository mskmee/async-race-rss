import { apiHref } from '../apiHref';
import { ICarsResponse } from '../../types/interface/ICarsResponse';
import { headers } from '../headers';

export const updateCar = async(id: number, carName: string, carColor: string): Promise<object | string> => {
  const body = {
    name: carName,
    color: carColor,
  };
  try {
    const response =
      await fetch(`${apiHref}/garage/${id}`, {method: 'PUT', headers: headers, body: JSON.stringify(body)});
    if(response.ok){
      return  await response.json();
    }
    return 'Oops! Check JSON Server. Error with updateCar car';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};