import { apiHref } from '../apiHref';

export const deleteCar = async(id: number): Promise<object | string> => {
  try {
    const response = await fetch(`${apiHref}/garage/${id}`, {method: 'DELETE'});
    if(response.ok){
      return  await response.json();
    }
    return 'Oops! Check JSON Server. Error with delete car';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};