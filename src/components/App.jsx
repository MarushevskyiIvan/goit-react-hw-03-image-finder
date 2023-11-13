import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { fetchImages } from './fetchAPI/FetchAPI';
import { SearchBar } from './searchBar/SearchBar';
import { ImageGallery } from './gallery/imageGallery/ImageGallery';
import { LoadMoreButton } from './loadMoreButton/LoadMoreButton';
import { Loader } from './loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: false,
    isLoading: false,
    collection: {},
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true, error: false });

        const query = this.state.query;
        const sliceQuery = query.slice(query.indexOf('/') + 1, query.length);

        const newImages = await fetchImages(sliceQuery, this.state.page);

        this.setState(prevState => {
          return { images: [...prevState.images, ...newImages.hits] };
        });

        this.setState({ collection: newImages });
      } catch (error) {
        toast.error('Attention  ERROR fetch images Please reload pages ');
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = newQuery => {
    if (newQuery === '') {
      return toast.error('Please enter the text of the query');
    }

    this.setState({
      query: `${Date.now()}/${newQuery}`,
      page: 1,
      images: [],
    });
  };
  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true, error: false });

    if (Math.ceil(this.state.collection.totalHits / 12) === this.state.page) {
      toast.error('Collection is end ');
      this.setState({ isLoading: false });
      return;
    }

    this.setState(prevState => {
      return { page: prevState.page + 1 };
    }, this.scrollToBottom());

    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, images } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}

        {images.length > 0 && <ImageGallery item={images} />}

        {images.length > 0 && (
          <LoadMoreButton addImages={this.handleLoadMore} />
        )}
        <Toaster />
        <GlobalStyle />
      </>
    );
  }
}
