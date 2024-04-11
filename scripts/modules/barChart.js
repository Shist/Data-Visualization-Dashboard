"use strict";

import { getResource } from "../services/json-placeholder.js";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function drawBarChart() {
  const promiseUsers = getResource(USERS_URL);
  const promisePosts = getResource(POSTS_URL);
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
  Promise.all([promiseUsers, promisePosts])
    .then((dataArr) => {
      mainWrapper.classList.remove("hidden-element");
      mainWrapper.classList.add("appeared-block");

      const container = document.querySelector("#bars-wrapper");
      const topBarSign = document.querySelector("#bars-top-bar-sign");
      const middleBarSign = document.querySelector("#bars-middle-bar-sign");
      const postTitleSubstrInput = document.querySelector(
        "#bars-filter-input-post-title"
      );
      const postBodySubstrInput = document.querySelector(
        "#bars-filter-input-post-body"
      );
      const users = dataArr[0];
      const posts = dataArr[1].filter(
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
        currUserData.postsCount++;
        if (currUserData.postsCount > maxPostCount) {
          maxPostCount = currUserData.postsCount;
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

export default drawBarChart;
