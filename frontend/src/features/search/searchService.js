import axios from 'axios';

const searchFunction = async (query) => {
  return await axios.get(`/api/search/${query}`);
};

export { searchFunction };
