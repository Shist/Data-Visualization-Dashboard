"use strict";

import { drawBarChart, drawLineChart, drawPieChart } from "./modules/charts.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#bars-try-again-btn")
    .addEventListener("click", drawBarChart);

  drawBarChart();
  drawLineChart();
  drawPieChart();
});
