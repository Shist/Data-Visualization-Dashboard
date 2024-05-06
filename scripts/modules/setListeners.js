"use strict";

import { drawBarChart } from "./barChart.js";
import { drawLineChart } from "./lineChart.js";
import { drawPieChart } from "./pieChart.js";

function showSuccessIcon(successIconId) {
  const successIcon = document.querySelector(`#${successIconId}`);

  successIcon.style.transition = "none";
  successIcon.style.opacity = 1;

  setTimeout(() => {
    successIcon.style.transition = "opacity 2s";
    successIcon.style.opacity = 0;
  }, 100);
}

function setListeners() {
  document
    .querySelector("#reload-bar-chart-btn")
    .addEventListener("click", () => {
      showSuccessIcon("reload-bar-chart-icon");
      drawBarChart();
    });
  document
    .querySelector("#reload-line-chart-btn")
    .addEventListener("click", () => {
      showSuccessIcon("reload-line-chart-icon");
      drawLineChart();
    });
  document
    .querySelector("#reload-pie-chart-btn")
    .addEventListener("click", () => {
      showSuccessIcon("reload-pie-chart-icon");
      drawPieChart();
    });
}

export default setListeners;
