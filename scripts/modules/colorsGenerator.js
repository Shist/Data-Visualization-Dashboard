"use strict";

function getColorsArr(N) {
  const colorsArr = [
    "#FF4040",
    "#66FF40",
    "#408CFF",
    "#FF40B2",
    "#D9FF40",
    "#40FFFF",
    "#D940FF",
    "#FFB340",
    "#40FF8C",
    "#6640FF",
  ];
  const preparedColorsCount = colorsArr.length;

  if (N <= preparedColorsCount) {
    return colorsArr.slice(0, N);
  }

  const letters = "0123456789ABCDEF";

  for (let k = 0; k < N - preparedColorsCount; k++) {
    let oneMoreColor = "#";

    for (let i = 0; i < 6; i++) {
      oneMoreColor += letters[Math.floor(Math.random() * 16)];
    }

    colorsArr.push(oneMoreColor);
  }

  return colorsArr;
}

export default getColorsArr;
