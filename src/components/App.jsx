import { useState, useEffect, useCallback } from 'react';

import styles from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from '../shared/Modal/Modal';
import searchGallery from '../shared/Services/galleryApi';
import Button from './Button/Button';
import GalleryDetail from './GalleryDetail/GalleryDetail';
import Loader from './Loader/Loader';

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [galleryDetail, setGalleryDetail] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchGallery = async () => {
        try {
          setLoading(true);
          const data = await searchGallery(search, page);
          const hits = data.data.hits;
          setItems(prevItems => [...prevItems, ...hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchGallery();
    }
  }, [search, page, setLoading, setItems, setError]);

  const getData = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
    return true;
  }, []);

  const showModalForm = useCallback(data => {
    setShowModal(true);
    setGalleryDetail(data);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setGalleryDetail(null);
    setShowModal(false);
  }, []);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={getData} />
      <ImageGallery items={items} showModalForm={showModalForm} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {Boolean(items.length) && <Button loadMore={loadMore} text="Load more" />}
      {showModal && (
        <Modal closeModal={closeModal}>
          <GalleryDetail {...galleryDetail} />
        </Modal>
      )}
    </div>
  );
};

export default App;
