"use strict";

import { drawBarChart, drawLineChart, drawPieChart } from "./modules/charts.js";

document.addEventListener("DOMContentLoaded", () => {
  drawBarChart();
  drawLineChart();
  drawPieChart();
});
