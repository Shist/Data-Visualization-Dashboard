"use strict";

import setListeners from "./modules/setListeners.js";
import {
  fetchUsersAndPosts,
  fetchComments,
} from "./services/json-placeholder.js";
import { handleBarChartData } from "./modules/barChart.js";
import { handleLineChartData } from "./modules/pieChart.js";
import { handlePieChartData } from "./modules/lineChart.js";

document.addEventListener("DOMContentLoaded", () => {
  setListeners();

  const pUsersAndPosts = fetchUsersAndPosts();
  const pComments = fetchComments();

  handleBarChartData(pUsersAndPosts);
  handleLineChartData(pComments);
  handlePieChartData(pUsersAndPosts);
});
