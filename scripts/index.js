"use strict";

import setListeners from "./modules/setListeners.js";
import { drawBarChart, drawLineChart, drawPieChart } from "./modules/charts.js";

document.addEventListener("DOMContentLoaded", () => {
  setListeners();

  drawBarChart();
  drawLineChart();
  drawPieChart();
});
