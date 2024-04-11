"use strict";

import { getResource } from "../services/json-placeholder.js";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawPieChart() {
  const promiseUsers = getResource(USERS_URL);
  const promisePosts = getResource(POSTS_URL);
  const mainWrapper = document.querySelector("#pie-chart-main-content-wrapper");

  // remove main block
  // remove error
  // show sample
  Promise.all([promiseUsers, promisePosts])
    .then((dataArr) => {
      mainWrapper.classList.remove("hidden-element");
      mainWrapper.classList.add("appeared-block");

      const postTitleSubstrInput = document.querySelector(
        "#pie-chart-filter-input-post-title"
      );
      const postBodySubstrInput = document.querySelector(
        "#pie-chart-filter-input-post-body"
      );
      const users = dataArr[0];
      const posts = dataArr[1].filter(
        (post) =>
          post.title.includes(postTitleSubstrInput.value) &&
          post.body.includes(postBodySubstrInput.value)
      );
      const chartData = {};

      users.forEach((user) => {
        chartData[user.id] = { name: user.username, postsCount: 0 };
      });
      posts.forEach((post) => {
        const currUserData = chartData[post.userId];
        currUserData.postsCount++;
      });

      const legendWrapper = document.querySelector("#pie-chart-legend-wrapper");
      const canvas = document.querySelector("#pie-chart-diagram");
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2;
      let startAngle = 0;

      legendWrapper.innerHTML = "";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();

      Object.values(chartData).forEach(({ name, postsCount }) => {
        const sliceAngle = (postsCount / posts.length) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        const newColor = getRandomColor();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = newColor;
        ctx.fill();

        legendWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="pie-chart__color-label-wrapper">
              <div
                class="pie-chart__color-block"
                style="background-color: ${newColor}"
              ></div>
              <span class="pie-chart__color-label">${name}</span>
            </div>`
        );

        startAngle = endAngle;
      });
    })
    .catch((e) => {
      // show error block
      // set error msg
    })
    .finally(() => {
      // remove sample
    });
}

export default drawPieChart;
