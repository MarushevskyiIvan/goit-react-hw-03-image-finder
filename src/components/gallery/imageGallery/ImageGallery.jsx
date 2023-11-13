import { ImageGalleryItem } from 'components/gallery/imageGalleryItem/ImageGalleryItem';
import { GalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ item }) => {
  return (
    <GalleryUl>
      {item.map(image => (
        <ImageGalleryItem images={image} key={image.id} />
      ))}
    </GalleryUl>
  );
};
