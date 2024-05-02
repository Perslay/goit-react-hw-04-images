import css from '../styles/App.module.css';
import { useState, useEffect } from 'react';
import { useRef } from 'react';

import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);
  const [modalAlt, setModalAlt] = useState('');
  const [modalSrc, setModalSrc] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const timerRef = useRef(null);

  const handleForm = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    let inputValue = form.elements.search.value.trim('');
    setImages([]);

    if (!inputValue) {
      const errorMessage = 'Please fill the search field';
      setError(errorMessage);
      return;
    }

    setSearchValue(inputValue);
    setCurrentPage(1);

    form.reset();
  };

  const handleOpen = event => {
    setClicked(true);
    const alt = event.target.alt;
    const src = event.target.getAttribute('datasrc');
    setModalAlt(alt);
    setModalSrc(src);
  };

  const handleClose = () => {
    setClicked(false);
  };

  const handlePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const fetchData = async () => {
    const query = `https://pixabay.com/api/?q=${searchValue}&page=${currentPage}&key=42513703-cc305044521a10f5f63ac2280&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await fetch(query);
      const data = await response.json();
      const fetchedImages = data.hits;

      const uniqueImages = fetchedImages.filter(
        image => !images.some(existingImage => existingImage.id === image.id)
      );

      if (uniqueImages.length > 0) {
        setImages(prevImages => [...prevImages, ...uniqueImages]);
      }
    } catch (error) {
      setError('Sorry, could not get images from the server');
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchValue || currentPage > 1) {
      setError('');
      setLoading(true);
      timerRef.current = setTimeout(() => {
        fetchData();
        setLoading(false);
      }, 300);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, currentPage, images]);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape' && clicked) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [clicked]);

  return (
    <div className={css.app}>
      <Searchbar handleForm={handleForm} />
      {searchValue && (
        <>
          {images.length > 0 && (
            <ImageGallery>
              {images.map(({ largeImageURL, webformatURL, tags, id }) => (
                <ImageGalleryItem
                  key={id}
                  imageURL={webformatURL}
                  alt={tags}
                  handleOpen={handleOpen}
                  largeImageURL={largeImageURL}
                />
              ))}
            </ImageGallery>
          )}
          {loading && <Loader />}
          {images.length > 0 && <Button handlePage={handlePage} />}
        </>
      )}
      {clicked && (
        <Modal alt={modalAlt} src={modalSrc} handleClose={handleClose} />
      )}
      {error && <div className={css.error}>{error}</div>}
    </div>
  );
};
