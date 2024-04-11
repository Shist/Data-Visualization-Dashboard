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
  // Sample data (replace with your actual data)
  const users = ["User1", "User2", "User3"];
  const posts = ["User1", "User1", "User2", "User2", "User2", "User3"];

  // Calculate the number of posts for each user
  const postCounts = {};
  posts.forEach((post) => {
    postCounts[post] = (postCounts[post] || 0) + 1;
  });

  // Calculate the total number of posts
  const totalPosts = posts.length;

  // Get the canvas element
  const canvas = document.querySelector("#pie-chart-diagram");
  const ctx = canvas.getContext("2d");

  // Pie chart settings
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2;
  let startAngle = 0;
  // Draw each slice of the pie chart
  Object.values(postCounts).forEach((count) => {
    const sliceAngle = (count / totalPosts) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = getRandomColor(); // Helper function to generate random colors
    ctx.fill();

    // Draw legend
    // ctx.rect(canvas.width - 100, centerY - 20 - margin, 10, 10);
    // ctx.fill();
    // ctx.font = "12px Roboto";
    // ctx.fillText(count + " posts", canvas.width - 85, centerY - 10 - margin);

    startAngle = endAngle;
  });
}

export default drawPieChart;
