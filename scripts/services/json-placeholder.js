import { USERS_URL, POSTS_URL, COMMENTS_URL } from "../constants/urls.js";

const dataObj = {
  usersAndPosts: [],
  comments: [],
};

const getResource = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};

function fetchUsersAndPosts() {
  const promiseUsers = getResource(USERS_URL);
  const promisePosts = getResource(POSTS_URL);

  return Promise.all([promiseUsers, promisePosts]);
}

function fetchComments() {
  return getResource(COMMENTS_URL);
}

export { dataObj, fetchUsersAndPosts, fetchComments };
