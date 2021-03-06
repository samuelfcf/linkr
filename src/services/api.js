import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function SignUp(request) {
  const body = {
    email: request.email,
    password: request.password,
    username: request.username,
    pictureUrl: request.pictureUrl,
  };
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

function LogIn(request) {
  const body = {
    email: request.email,
    password: request.password,
  };
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function getListPosts(token, lastPostID = null, firstPostID = null) {
  if (lastPostID) {
    return axios.get(`${BASE_URL}/following/posts/?olderThan=${lastPostID}`, getConfig(token));
  } else if (firstPostID) {
    return axios.get(`${BASE_URL}/following/posts/?earlierThan=${firstPostID}`, getConfig(token));
  }
  return axios.get(`${BASE_URL}/following/posts/`, getConfig(token));
}

function getTrendings(token) {
  return axios.get(`${BASE_URL}/hashtags/trending`, getConfig(token));
}

function postPublish(link, description, location, token) {
  const body = () => (
    (location !== null)
      ? {
        text: description,
        link: link,
        geolocation: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      }
      : { text: description, link: link }
  );
  return axios.post(`${BASE_URL}/posts`, body(), getConfig(token));
}

function postLike(token, postId) {
  return axios.post(`${BASE_URL}/posts/${postId}/like`, "", getConfig(token));
}

function postDislike(token, postId) {
  return axios.post(
    `${BASE_URL}/posts/${postId}/dislike`,
    "",
    getConfig(token)
  );
}

function getUserPosts(token, userId, lastPostID = null) {
  if (!lastPostID) {
    return axios.get(`${BASE_URL}/users/${userId}/posts/`, getConfig(token))
  } else {
    return axios.get(`${BASE_URL}/users/${userId}/posts/?olderThan=${lastPostID}`, getConfig(token))
  }
}

function getHashtagPosts(token, hashtag, lastPostID = null) {
  if (!lastPostID) {
    return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, getConfig(token));
  } else {
    return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts/?olderThan=${lastPostID}`, getConfig(token));
  }
}

function deletePost(token, postId) {
  const promise = axios.delete(`${BASE_URL}/posts/${postId}`, getConfig(token));
  return promise;
}

function getUserInfo(token, userId) {
  return axios.get(`${BASE_URL}/users/${userId}`, getConfig(token));
}

function getPostsUserLiked(token, lastPostID = null) {
  if (!lastPostID) {
    return axios.get(`${BASE_URL}/posts/liked`, getConfig(token))
  } else {
    return axios.get(`${BASE_URL}/posts/liked/?olderThan=${lastPostID}`, getConfig(token))
  }
}

function putEditUserPost(postId, description, token) {
  const body = {
    text: description,
  };
  return axios.put(`${BASE_URL}/posts/${postId}`, body, getConfig(token));
}

function toggleFollowAPI(token, userID, whatToDo) {
  return axios.post(
    `${BASE_URL}/users/${userID}/${whatToDo}`,
    "",
    getConfig(token)
  );
}

function getUsersIFollow(token) {
  return axios.get(`${BASE_URL}/users/follows`, getConfig(token));
}

function getListComments(token, postId) {
  return axios.get(`${BASE_URL}/posts/${postId}/comments`, getConfig(token));
}

function postComment(token, postId, text) {
  return axios.post(`${BASE_URL}/posts/${postId}/comment`, { text }, getConfig(token));

}
function getSearchedUser(token, username) {
  return axios.get(`${BASE_URL}/users/search?username=${username}`, getConfig(token));
}

function repost(token, postID) {
  return axios.post(`${BASE_URL}/posts/${postID}/share`, "", getConfig(token));
}

export {
  SignUp,
  LogIn,
  getTrendings,
  getListPosts,
  postPublish,
  getUserPosts,
  getHashtagPosts,
  postLike,
  postDislike,
  getUserInfo,
  deletePost,
  getPostsUserLiked,
  putEditUserPost,
  toggleFollowAPI,
  getUsersIFollow,
  getListComments,
  postComment,
  getSearchedUser,
  repost
};
