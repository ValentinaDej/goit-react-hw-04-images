import { Component } from 'react';

import styles from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from '../shared/Modal/Modal';
import searchGallery from '../shared/Services/galleryApi';
import Button from './Button/Button';
import GalleryDetail from './GalleryDetail/GalleryDetail';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    galleryDetail: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      this.fetchGallery();
    }
  }

  async fetchGallery() {
    try {
      const { search, page } = this.state;
      const data = await searchGallery(search, page);
      const hits = data.data.hits;
      this.setState({ loading: true });
      this.setState(({ items }) => ({ items: [...items, ...hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  getData = ({ search }) => {
    const prevSearch = this.state.search;
    if (prevSearch !== search) {
      this.setState({ search, items: [], page: 1 });
      return true;
    }
    return false;
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showModalForm = ({ largeImageURL, tags }) => {
    this.setState({ showModal: true, galleryDetail: { largeImageURL, tags } });
  };

  closeModal = () => {
    this.setState({ showModal: false, galleryDetail: null });
  };

  render() {
    const { getData, loadMore, showModalForm, closeModal } = this;
    const { items, loading, error, showModal, galleryDetail } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={getData} />
        <ImageGallery items={items} showModalForm={showModalForm} />
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {Boolean(items.length) && (
          <Button loadMore={loadMore} text="Load more" />
        )}
        {showModal && (
          <Modal closeModal={closeModal}>
            <GalleryDetail galleryDetail={galleryDetail} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
