"use strict";

import setListeners from "./modules/setListeners.js";
import drawBarChart from "./modules/barChart.js";
import drawPieChart from "./modules/pieChart.js";
import drawLineChart from "./modules/lineChart.js";

document.addEventListener("DOMContentLoaded", () => {
  setListeners();

  drawBarChart();
  drawLineChart();
  drawPieChart();
});
