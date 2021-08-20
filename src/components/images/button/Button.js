import React from 'react';
import PropTypes from 'prop-types';
import s from '../imageGallery/Image.module.css';

function Button(props) {
  const { onLoadMoreClick } = props;
  const { ButtonContainer, Button } = s;

  return (
    <div className={ButtonContainer}>
      <button className={Button} onClick={onLoadMoreClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};

export default Button;
