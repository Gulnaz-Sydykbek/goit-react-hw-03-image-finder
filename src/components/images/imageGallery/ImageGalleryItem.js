import PropTypes from 'prop-types';
import s from './Image.module.css';

function ImageGalleryItem(props) {
  const { largeImageURL, webformatURL, tags, onOpenLargeImgUrl } = props;
  const { ImageGalleryItemIMG, ImageGalleryItemImage } = s;

  return (
    <li className={ImageGalleryItemIMG}>
      <img
        onClick={() => onOpenLargeImgUrl(largeImageURL)}
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
  onOpenLargeImgUrl: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
