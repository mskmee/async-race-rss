import { ICarAdd } from '../types/interface/ICarAdd';

const apiAddress = 'http://127.0.0.1:3000';
const headers = {
  'Content-Type': 'application/json',
};
export const fetchData = async (endPoint: string, method = 'GET', body?: ICarAdd): Promise<Response | string> => {
  try {
    if(body){
      const response = await fetch(`${apiAddress}${endPoint}`, {method: method, body: JSON.stringify(body),
        headers: headers});
      return response;
    }
    const response = await fetch(`${apiAddress}${endPoint}`, {method: method});
    return response;
  } catch (e) {
    return `Oops! We got ${e}`;
  }
};

