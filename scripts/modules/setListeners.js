"use strict";

import { drawBarChart } from "./charts.js";

function setListeners() {
  document
    .querySelector("#reload-histogram-btn")
    .addEventListener("click", drawBarChart);
}

export default setListeners;
