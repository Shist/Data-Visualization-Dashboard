"use strict";

import drawBarChart from "./barChart.js";
import drawPieChart from "./pieChart.js";
import drawLineChart from "./lineChart.js";

function setListeners() {
  document
    .querySelector("#reload-bar-chart-btn")
    .addEventListener("click", drawBarChart);
  document
    .querySelector("#reload-pie-chart-btn")
    .addEventListener("click", drawPieChart);
}

export default setListeners;
