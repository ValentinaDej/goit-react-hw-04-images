import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    per_page: 12,
  },
});

const apiKey = '31094893-91e9afbe8165d9cedcce56644';

const searchGallery = async (q, page = 1) => {
  const data = await instance.get('/', {
    params: {
      q,
      key: apiKey,
      image_type: 'photo',
      rientation: 'horizontal',
      page,
    },
  });

  return data;
};

export default searchGallery;
