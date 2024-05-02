import PropTypes from 'prop-types';
import css from '../styles/Modal.module.css';

export const Modal = ({ alt, src, handleClose }) => {
  const handleClick = evt => {
    evt.stopPropagation();
  };

  return (
    <div onClick={handleClose} className={css.overlay}>
        <img src={src} alt={alt} id="modalImage" onClick={handleClick} className={css.modal} />
    </div>
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
