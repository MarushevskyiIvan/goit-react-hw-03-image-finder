import { ItemModal } from 'components/modal/ItemModal';
import { Component } from 'react';
import { ImageGalleryImage, ImageGalleryLi } from './ImageGallery.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const {
      images: { webformatURL, tags, largeImageURL },
    } = this.props;

    return (
      <>
        <ImageGalleryLi className="gallery-item" onClick={this.toggleModal}>
          <ImageGalleryImage src={webformatURL} alt={tags} />
        </ImageGalleryLi>
        <ItemModal
          isOpen={this.state.isModalOpen}
          isClose={this.toggleModal}
          image={largeImageURL}
          alt={tags}
        />
      </>
    );
  }
}
