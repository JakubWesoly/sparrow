import axios from 'axios';

const API_URL = '/api/posts/';

const createPost = async (postData) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  const response = await axios.post(
    API_URL,
    {
      content: postData.content,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  return response.data;
};

const getNewestPosts = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
    },
  });

  return response.data;
};

const getLikedPosts = async () => {
  const response = await axios.get(API_URL + 'liked', {
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
    },
  });
  return response.data;
};

const getUsersPosts = async (id) => {
  const response = await axios.get('/api/posts/user/' + id);
  return response.data;
};

const getFollowedPosts = async () => {
  const response = await axios.get('/api/posts/followed', {
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
    },
  });
  return response.data;
};

const postsService = {
  createPost,
  getNewestPosts,
  getLikedPosts,
  getUsersPosts,
  getFollowedPosts,
};

export default postsService;
