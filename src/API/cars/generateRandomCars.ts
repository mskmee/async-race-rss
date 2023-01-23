import { ICarsGenerationResponse } from '../../types/interface/ICarsGenerationResponse';
import { createCar } from './createCar';
import { ICarsResponse } from '../../types/interface/ICarsResponse';
import { ElementState } from '../../types/enum/ElementState';

export const generateRandomCars = async(skip: number): Promise<string | void> => {
  try {
    const headers = {
      'X-Parse-Application-Id': 'ZlQJyoFKLeH8ulGAeVckevg3DOZWScu8v7FKHL3B',
      'X-Parse-REST-API-Key': 'BfcHpR6H1mcm6pGzLrqI3bvG05PfMPCjf5fGf2Fl'
    };
    const response = await fetch(`https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?skip=${skip}&excludeKeys=Category`,
      {headers: headers});
    const data = await response.json();
    if(typeof data === 'string') return 'Oops! Error';
    return addNewCars(data);
  } catch (e) {
    return `Oops! Error ${e}`;
  }
};

export const addNewCars = async (data: Promise<ICarsGenerationResponse>) => {
  const promiseArr: Promise<string | ICarsResponse>[] = [];
  const response = await data;
  response.results.forEach(el => {
    const model = `${el.Make} ${el.Model} ${el.Year} year`;
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    promiseArr.push(createCar(model, `#${randomColor}`));
  });
  Promise.all(promiseArr).then((value) => {
    if(value.some(el => el === ElementState.warning)){
      //TODO handle err
      return;
    }
  });
};
