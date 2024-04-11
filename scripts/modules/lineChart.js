"use strict";

import { getResource } from "../services/json-placeholder.js";

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

function countCommentsByMonth(comments) {
  const counts = new Array(12).fill(0);

  comments.forEach((comment) => {
    const month = comment.date.getMonth();
    counts[month]++;
  });

  return counts;
}

function drawLineChart() {
  const comments = [
    { date: new Date("2024-01-15"), text: "Comment 1" },
    { date: new Date("2024-04-20"), text: "Comment 2" },
    { date: new Date("2024-04-20"), text: "Comment 3" },
    { date: new Date("2024-04-20"), text: "Comment 4" },
    { date: new Date("2024-05-20"), text: "Comment 5" },
    { date: new Date("2024-05-20"), text: "Comment 6" },
    { date: new Date("2024-08-20"), text: "Comment 7" },
    { date: new Date("2024-09-20"), text: "Comment 8" },
    { date: new Date("2024-10-20"), text: "Comment 9" },
    { date: new Date("2024-11-20"), text: "Comment 10" },
    { date: new Date("2024-11-20"), text: "Comment 11" },
    { date: new Date("2024-12-20"), text: "Comment 12" },
    { date: new Date("2024-03-20"), text: "Comment 13" },
    { date: new Date("2024-03-20"), text: "Comment 14" },
    { date: new Date("2024-03-20"), text: "Comment 15" },
  ];

  const commentCounts = countCommentsByMonth(comments);

  const canvas = document.getElementById("line-chart-graph");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const maxCount = Math.max(...commentCounts);

  const barWidth = width / 12;

  ctx.strokeStyle = "black";

  ctx.beginPath();
  ctx.moveTo(barWidth / 2, height - 30);
  ctx.lineTo(width, height - 30);
  ctx.stroke();

  ctx.font = "bold 14px Roboto";
  ctx.textAlign = "center";
  ctx.fillStyle = "#000";
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
    const x = monthIndex * barWidth + barWidth / 2;
    ctx.fillText(months[monthIndex], x, height - 10, 30);
  }

  ctx.beginPath();
  ctx.moveTo(barWidth / 2, height - 30);
  ctx.lineTo(barWidth / 2, 0);
  ctx.stroke();

  ctx.font = "bold 14px Roboto";
  ctx.textAlign = "right";
  const oneTenthOfCommentsCount = maxCount / 10;
  for (let k = 0; k <= 10; k++) {
    const labelNum = +(oneTenthOfCommentsCount * k).toFixed(2);
    const y = height - 30 - (k / 10) * (height - 60);
    ctx.fillText(labelNum, 25, y + 5, 25);
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    const x = i * barWidth + barWidth / 2;
    const y = height - 30 - (commentCounts[i] / maxCount) * (height - 60);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  getResource(COMMENTS_URL).then((comments) => {
    console.log(comments[0]);
  });
}

export default drawLineChart;
