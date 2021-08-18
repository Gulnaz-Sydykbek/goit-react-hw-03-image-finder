import React, { Component } from 'react';
import ImageError from './ImageError';

class ImageInfo extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    const KEY = '22204382-c38be1b1e7fd4cceb3bc7515f';
    const BASE_URL = 'https://pixabay.com/api';
    const page = 1;
    const perPage = 12;
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${nextName}&page=${page}&per_page=${perPage}&key=${KEY}`;

    if (prevName !== nextName) {
      this.setState({
        status: 'pending',
      });

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`There is no image with name ${nextName}`),
          );
        })
        .then(data =>
          this.setState({
            images: data.hits,
            status: 'resolved',
          }),
        )
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          }),
        );
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <ImageError message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <ul>
          {images.map(image => {
            const { id, webformatURL, tags } = image;

            return (
              <li key={id}>
                <img src={webformatURL} alt={tags} />
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default ImageInfo;
