import PropTypes from 'prop-types';

function fetchImages(name, page) {
  const KEY = '22204382-c38be1b1e7fd4cceb3bc7515f';
  const BASE_URL = 'https://pixabay.com/api';
  const perPage = 12;
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=${perPage}&key=${KEY}`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`There is no image with name ${name}`));
    })
    .then(data => data.hits);
}

fetchImages.propTypes = {
  name: PropTypes.string.isRequired,
  //page: PropTypes.number.isRequired,
};

export default fetchImages;
