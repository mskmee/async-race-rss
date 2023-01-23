import { apiHref } from '../apiHref';
import { CarEngineStatus } from '../../types/enum/CarEngineStatus';
import { ICarEngineStart } from '../../types/interface/ICarEngineStart';

export const stopCarEngine = async(id:number): Promise <ICarEngineStart | string> => {
  try {
    const response =
      await fetch(`${apiHref}/engine?id=${id}&status=${CarEngineStatus.stop}`, {method: 'PATCH'});
    if(response.ok){
      return await response.json();
    }
    return 'Oops! Check JSON Server. Error with stop engine';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};