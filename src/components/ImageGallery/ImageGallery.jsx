import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ items, showModalForm }) => {
  return (
    <ul className={styles.ImageGallery}>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            showModalForm={showModalForm}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  showModalForm: PropTypes.func.isRequired,
  items: PropTypes.array,
};
