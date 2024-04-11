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

      const canvas = document.querySelector("#pie-chart-diagram");
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2;
      let startAngle = 0;

      Object.values(chartData).forEach(({ name, postsCount }) => {
        const sliceAngle = (postsCount / posts.length) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = getRandomColor();
        ctx.fill();

        // Draw legend
        // ctx.rect(canvas.width - 100, centerY - 20 - margin, 10, 10);
        // ctx.fill();
        // ctx.font = "12px Roboto";
        // ctx.fillText(count + " posts", canvas.width - 85, centerY - 10 - margin);

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
