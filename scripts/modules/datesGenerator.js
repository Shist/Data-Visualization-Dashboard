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

export default getDatesArr;
