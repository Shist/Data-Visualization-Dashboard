"use strict";

import { drawBarChart } from "./barChart.js";
import { drawLineChart } from "./lineChart.js";
import { drawPieChart } from "./pieChart.js";

function setListeners() {
  document
    .querySelector("#reload-bar-chart-btn")
    .addEventListener("click", drawBarChart);
  document
    .querySelector("#reload-line-chart-btn")
    .addEventListener("click", drawLineChart);
  document
    .querySelector("#reload-pie-chart-btn")
    .addEventListener("click", drawPieChart);
}

export default setListeners;
