import axios from 'axios';

const API_URL = 'api/posts/';

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
  const response = await axios.get(API_URL);

  return response.data;
};

const postsService = {
  createPost,
  getNewestPosts,
};

export default postsService;
