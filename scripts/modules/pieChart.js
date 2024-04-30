"use strict";

import { getResource } from "../services/json-placeholder.js";
import getColorsArr from "./colorsGenerator.js";
import { USERS_URL, POSTS_URL } from "../constants/urls.js";

function drawPieChart() {
  const promiseUsers = getResource(USERS_URL);
  const promisePosts = getResource(POSTS_URL);
  const mainWrapper = document.querySelector("#pie-chart-main-content-wrapper");
  const samplesWrapper = document.querySelector(
    "#pie-chart-samples-content-wrapper"
  );
  const errorMsgWrapper = document.querySelector(
    "#pie-chart-error-msg-wrapper"
  );

  mainWrapper.classList.remove("appeared-block");
  mainWrapper.classList.add("hidden-element");
  errorMsgWrapper.classList.remove("appeared-flex");
  errorMsgWrapper.classList.add("hidden-element");
  samplesWrapper.classList.remove("hidden-element");
  samplesWrapper.classList.add("appeared-block");
  Promise.all([promiseUsers, promisePosts])
    .then((dataArr) => {
      mainWrapper.classList.remove("hidden-element");
      mainWrapper.classList.add("appeared-block");

      const userUsernameSubstrInput = document.querySelector(
        "#pie-chart-filter-input-user-username"
      );
      const userEmailSubstrInput = document.querySelector(
        "#pie-chart-filter-input-user-email"
      );
      const postTitleSubstrInput = document.querySelector(
        "#pie-chart-filter-input-post-title"
      );
      const postBodySubstrInput = document.querySelector(
        "#pie-chart-filter-input-post-body"
      );
      const users = dataArr[0].filter(
        (user) =>
          user.username.includes(userUsernameSubstrInput.value) &&
          user.email.includes(userEmailSubstrInput.value)
      );
      const posts = dataArr[1].filter(
        (post) =>
          post.title.includes(postTitleSubstrInput.value) &&
          post.body.includes(postBodySubstrInput.value)
      );
      const colorsArr = getColorsArr(users.length);
      const chartData = {};

      users.forEach((user) => {
        chartData[user.id] = { name: user.username, postsCount: 0 };
      });
      posts.forEach((post) => {
        const currUserData = chartData[post.userId];
        if (currUserData) {
          currUserData.postsCount++;
        }
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

      if (!Object.values(chartData).length) {
        return;
      }

      const totalPostsCount = Object.values(chartData)
        .map((userObj) => userObj.postsCount)
        .reduce((prevCount, nextCount) => prevCount + nextCount);

      Object.values(chartData).forEach(({ name, postsCount }) => {
        const sliceAngle = (postsCount / totalPostsCount) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        const newColor = colorsArr.pop();

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
      errorMsgWrapper.classList.remove("hidden-element");
      errorMsgWrapper.classList.add("appeared-flex");
      document.querySelector("#pie-chart-error-msg-span").textContent =
        e.message;
    })
    .finally(() => {
      samplesWrapper.classList.remove("appeared-block");
      samplesWrapper.classList.add("hidden-element");
    });
}

export default drawPieChart;
