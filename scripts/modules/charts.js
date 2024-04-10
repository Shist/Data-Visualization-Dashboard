"use strict";

import { getResource } from "../services/json-placeholder.js";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

function drawBarChart() {
  const promiseUsers = getResource(USERS_URL);
  const promisePosts = getResource(POSTS_URL);

  // set some spinner
  Promise.all([promiseUsers, promisePosts])
    .then((dataArr) => {
      const container = document.querySelector(".bar-chart__bars-wrapper");
      const topBarSign = document.querySelector("#top-bar-sign");
      const middleBarSign = document.querySelector("#middle-bar-sign");
      const users = dataArr[0];
      const posts = dataArr[1];
      const chartData = {};
      let maxPostCount = 0;

      users.forEach((user) => {
        chartData[user.id] = { name: user.username, postsCount: 0 };
      });
      posts.forEach((post) => {
        const currUserData = chartData[post.userId];
        currUserData.postsCount++;
        if (currUserData.postsCount > maxPostCount) {
          maxPostCount = currUserData.postsCount;
        }
      });

      topBarSign.textContent = maxPostCount;
      middleBarSign.textContent = +(maxPostCount / 2).toFixed(1);

      Object.values(chartData).forEach(({ name, postsCount }) => {
        const barHeightRatio = (postsCount / maxPostCount) * 100;
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="bar-chart__bar-label-wrapper">
                <div class="bar-chart__bar-wrapper">
                    <div class="bar-chart__bar" style="flex-basis:${barHeightRatio}%"></div>
                </div>
                <span class="bar-chart__label">${name}</span>
            </div>`
        );
      });
    })
    .catch((e) => {
      // display some error
    })
    .finally(() => {
      // Remove the spinner
    });
}

function drawLineChart() {
  // Here will be logic for drawing line chart
}

function drawPieChart() {
  // Here will be logic for drawing pie chart
}

export { drawBarChart, drawLineChart, drawPieChart };
