const headers = {
  'Content-Type': 'application/json',
};
const car = {
  id: 3,
  wins: 1,
  time: 10,
};
const getData = async () => {
  try {
    const response = fetch('http://localhost:3000/winners', {method: 'POST', body: JSON.stringify(car), headers: headers});
    const rawData = await response;
    console.log(rawData.status)
    const data = await rawData.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
getData().then();