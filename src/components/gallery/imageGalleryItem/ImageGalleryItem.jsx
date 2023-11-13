import { ItemModal } from 'components/modal/ItemModal';
import { Component } from 'react';
import { ImageGalleryImage, ImageGalleryLi } from './ImageGallery.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      images: { webformatURL, tags, largeImageURL },
    } = this.props;

    return (
      <>
        <ImageGalleryLi className="gallery-item" onClick={this.openModal}>
          <ImageGalleryImage src={webformatURL} alt={tags} />
        </ImageGalleryLi>
        <ItemModal
          isOpen={this.state.isModalOpen}
          isClose={this.closeModal}
          image={largeImageURL}
          alt={tags}
        />
      </>
    );
  }
}
