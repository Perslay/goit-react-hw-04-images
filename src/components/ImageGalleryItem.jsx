import PropTypes from 'prop-types';
import css from '../styles/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  largeImageURL,
  imageURL,
  alt,
  handleOpen,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        onClick={handleOpen}
        className={css.image}
        src={imageURL}
        alt={alt}
        datasrc={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
};
