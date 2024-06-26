"use strict";

import { dataObj } from "../services/json-placeholder.js";

function drawBarChart() {
  const container = document.querySelector("#bars-wrapper");
  const topBarSign = document.querySelector("#bars-top-bar-sign");
  const middleBarSign = document.querySelector("#bars-middle-bar-sign");
  const userUsernameSubstrInput = document.querySelector(
    "#bars-filter-input-user-username"
  );
  const userEmailSubstrInput = document.querySelector(
    "#bars-filter-input-user-email"
  );
  const postTitleSubstrInput = document.querySelector(
    "#bars-filter-input-post-title"
  );
  const postBodySubstrInput = document.querySelector(
    "#bars-filter-input-post-body"
  );
  const users = dataObj.usersAndPosts[0].filter(
    (user) =>
      user.username.includes(userUsernameSubstrInput.value) &&
      user.email.includes(userEmailSubstrInput.value)
  );
  const posts = dataObj.usersAndPosts[1].filter(
    (post) =>
      post.title.includes(postTitleSubstrInput.value) &&
      post.body.includes(postBodySubstrInput.value)
  );
  const chartData = {};
  let maxPostCount = 0;

  users.forEach((user) => {
    chartData[user.id] = { name: user.username, postsCount: 0 };
  });
  posts.forEach((post) => {
    const currUserData = chartData[post.userId];
    if (currUserData) {
      currUserData.postsCount++;
      if (currUserData.postsCount > maxPostCount) {
        maxPostCount = currUserData.postsCount;
      }
    }
  });

  topBarSign.textContent = maxPostCount;
  middleBarSign.textContent = +(maxPostCount / 2).toFixed(1);

  container.innerHTML = "";

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
}

function handleBarChartData(pUsersAndPosts) {
  const mainWrapper = document.querySelector("#bars-main-content-wrapper");
  const samplesWrapper = document.querySelector(
    "#bars-samples-content-wrapper"
  );
  const errorMsgWrapper = document.querySelector("#bars-error-msg-wrapper");

  mainWrapper.classList.remove("appeared-block");
  mainWrapper.classList.add("hidden-element");
  errorMsgWrapper.classList.remove("appeared-flex");
  errorMsgWrapper.classList.add("hidden-element");
  samplesWrapper.classList.remove("hidden-element");
  samplesWrapper.classList.add("appeared-block");
  pUsersAndPosts
    .then((dataArr) => {
      mainWrapper.classList.remove("hidden-element");
      mainWrapper.classList.add("appeared-block");

      dataObj.usersAndPosts = dataArr;
      drawBarChart();
    })
    .catch((e) => {
      errorMsgWrapper.classList.remove("hidden-element");
      errorMsgWrapper.classList.add("appeared-flex");
      document.querySelector("#bars-error-msg-span").textContent = e.message;
    })
    .finally(() => {
      samplesWrapper.classList.remove("appeared-block");
      samplesWrapper.classList.add("hidden-element");
    });
}

export { drawBarChart, handleBarChartData };
