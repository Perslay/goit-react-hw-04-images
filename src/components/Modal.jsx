import PropTypes from 'prop-types';
import css from '../styles/Modal.module.css';

export const Modal = ({ alt, src, handleClose }) => {
  const handleClick = event => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleClose} className={css.overlay}>
      <div onClick={handleClick} className={css.modal}>
        <img src={src} alt={alt} id="modalImage" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
