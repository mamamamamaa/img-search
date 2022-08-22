const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/?';

export default async function (data, page) {
  const params = new URLSearchParams({
    key: '29298623-332f005867e72021b2987b33f',
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });

  return await axios.get(`${BASE_URL}${params}`);
}
