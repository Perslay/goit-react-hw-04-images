import PropTypes from 'prop-types';
import css from '../styles/ImageGallery.module.css';
import React from 'react';

export const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.array.isRequired,
};
