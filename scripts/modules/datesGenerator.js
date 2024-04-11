"use strict";

function getDatesArr(N, startDate, endDate) {
  const datesArr = [];
  const start = startDate.getTime();
  const end = endDate.getTime();

  for (let i = 0; i < N; i++) {
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);
    datesArr.push(randomDate);
  }

  return datesArr;
}

console.log(getDatesArr(10, new Date("2023-04-01"), new Date("2024-03-01")));

export default getDatesArr;
