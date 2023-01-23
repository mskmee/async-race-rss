import { apiHref } from '../apiHref';
import { CarEngineStatus } from '../../types/enum/CarEngineStatus';
import { FetchStatusCodes } from '../../types/enum/fetchStatusCodes';
import { ICarDriveStatus } from '../../types/interface/ICarDriveStatus';

export const driveCar = async(id:number): Promise <ICarDriveStatus | string> => {
  try {
    const response =
      await fetch(`${apiHref}/engine?id=${id}&status=${CarEngineStatus.drive}`, {method: 'PATCH'});
    if(response.ok){
      return await response.json();
    }
    if(response.status === FetchStatusCodes.engineBroken){
      return {
        broken: true
      };
    }
    return 'Oops! Check JSON Server. Error with drive car';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};