import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39756459-c2ffb5d5cd8be2a96a5bc05b0';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=cat&page=${page}&key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
