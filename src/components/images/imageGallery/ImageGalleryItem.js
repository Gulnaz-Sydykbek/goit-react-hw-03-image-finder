import PropTypes from 'prop-types';
import s from './Image.module.css';

function ImageGalleryItem(props) {
  const { largeImageURL, webformatURL, tags, onOpenLargeImg } = props;
  const { ImageGalleryItemIMG, ImageGalleryItemImage } = s;

  return (
    <li className={ImageGalleryItemIMG}>
      <img
        onClick={() => onOpenLargeImg(largeImageURL)}
        src={webformatURL}
        alt={tags}
        className={ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenLargeImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
