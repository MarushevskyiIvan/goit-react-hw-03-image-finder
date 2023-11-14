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
    randomId: 0,
    isLoadMore: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page ||
      prevState.randomId !== this.state.randomId
    ) {
      try {
        this.setState({ isLoading: true, error: false });

        const newImages = await fetchImages(this.state.query, this.state.page);

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...newImages.hits],
            isLoadMore: this.state.page < Math.ceil(newImages.totalHits / 100),
          };
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
    if (newQuery.trim() === '') {
      return toast.error('Please enter the text of the query');
    }

    this.setState({
      query: newQuery,
      page: 1,
      images: [],
      randomId: Math.random(),
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => {
        return { page: prevState.page + 1 };
      },
      () => {
        scroll.scrollToBottom();
      }
    );
  };

  render() {
    const { isLoading, images, isLoadMore } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}

        {images.length > 0 && <ImageGallery item={images} />}

        {images.length > 0 && isLoadMore && (
          <LoadMoreButton addImages={this.handleLoadMore} />
        )}
        <Toaster />
        <GlobalStyle />
      </>
    );
  }
}
