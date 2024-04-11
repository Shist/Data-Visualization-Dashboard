"use strict";

import { getResource } from "../services/json-placeholder.js";
import getDatesArr from "./datesGenerator.js";

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

function countCommentsByMonth(comments) {
  const countsPerMonthArr = new Array(12).fill(0);

  comments.forEach((comment) => {
    const month = comment.date.getMonth();
    countsPerMonthArr[month]++;
  });

  return countsPerMonthArr;
}

function drawLineChart() {
  getResource(COMMENTS_URL)
    .then((comments) => {
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
    })
    .catch((e) => {
      // show error block
      // set error msg
    })
    .finally(() => {
      // remove sample
    });
}

export default drawLineChart;
