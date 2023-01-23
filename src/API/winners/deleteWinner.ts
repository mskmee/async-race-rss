import { apiHref } from '../apiHref';

export const deleteWinner = async(id:number): Promise <object | string> => {
  try {
    const response = await fetch(`${apiHref}/winners/${id}`, {method: 'DELETE'});
    if(response.ok){
      return await response.json();
    }
    return 'Oops! Check JSON Server. Error with delete winner';
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};