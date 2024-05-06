"use strict";

import { dataObj } from "../services/json-placeholder.js";
import getDatesArr from "./datesGenerator.js";

function countCommentsByMonth(comments) {
  const countsPerMonthArr = new Array(12).fill(0);

  comments.forEach((comment) => {
    const month = comment.date.getMonth();
    countsPerMonthArr[month]++;
  });

  return countsPerMonthArr;
}

function drawLineChart() {
  const commentEmailSubstrInput = document.querySelector(
    "#line-chart-filter-input-comment-email"
  );
  const commentBodySubstrInput = document.querySelector(
    "#line-chart-filter-input-comment-body"
  );
  const comments = dataObj.comments.filter(
    (user) =>
      user.email.includes(commentEmailSubstrInput.value) &&
      user.body.includes(commentBodySubstrInput.value)
  );
  const randomDatesArr = getDatesArr(
    comments.length,
    new Date("2023-04-01"),
    new Date("2024-04-01")
  );

  comments.forEach((comment, index) => {
    comment.date = randomDatesArr[index];
  });

  const commentCounts = countCommentsByMonth(comments);
  const maxCount = Math.max(...commentCounts);

  const canvasPadding = 30;
  const canvas = document.getElementById("line-chart-graph");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const barWidth = width / 12;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "black";

  ctx.beginPath();
  ctx.moveTo(canvasPadding, height - canvasPadding);
  ctx.lineTo(width, height - canvasPadding);
  ctx.stroke();

  ctx.font = "bold 14px Roboto";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const x = monthIndex * barWidth + canvasPadding;
    ctx.fillText(months[monthIndex], x, height - 10, 25);
  }

  ctx.beginPath();
  ctx.moveTo(canvasPadding, height - canvasPadding);
  ctx.lineTo(canvasPadding, 0);
  ctx.stroke();

  ctx.font = "bold 14px Roboto";
  ctx.textAlign = "right";
  for (let k = 0; k <= 10; k++) {
    const labelNum = +((maxCount / 10) * k).toFixed(2);
    const y =
      height - ((k / 10) * (height - 2 * canvasPadding) + canvasPadding);
    ctx.fillText(labelNum, canvasPadding - 5, y + 5, 25);
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    const x = i * barWidth + canvasPadding;
    const y = height - 30 - (commentCounts[i] / maxCount) * (height - 60);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function handleLineChartData(pComments) {
  const mainWrapper = document.querySelector(
    "#line-chart-main-content-wrapper"
  );
  const samplesWrapper = document.querySelector(
    "#line-chart-samples-content-wrapper"
  );
  const errorMsgWrapper = document.querySelector(
    "#line-chart-error-msg-wrapper"
  );

  mainWrapper.classList.remove("appeared-block");
  mainWrapper.classList.add("hidden-element");
  errorMsgWrapper.classList.remove("appeared-flex");
  errorMsgWrapper.classList.add("hidden-element");
  samplesWrapper.classList.remove("hidden-element");
  samplesWrapper.classList.add("appeared-block");
  pComments
    .then((allComments) => {
      mainWrapper.classList.remove("hidden-element");
      mainWrapper.classList.add("appeared-block");

      dataObj.comments = allComments;
      drawLineChart();
    })
    .catch((e) => {
      errorMsgWrapper.classList.remove("hidden-element");
      errorMsgWrapper.classList.add("appeared-flex");
      document.querySelector("#line-chart-error-msg-span").textContent =
        e.message;
    })
    .finally(() => {
      samplesWrapper.classList.remove("appeared-block");
      samplesWrapper.classList.add("hidden-element");
    });
}

export { drawLineChart, handleLineChartData };
