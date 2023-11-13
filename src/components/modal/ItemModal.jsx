import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',

    padding: '0',

    transform: 'translate(-50%, -50%)',
  },
};

export const ItemModal = ({ isOpen, isClose, image, alt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isClose}
      style={customStyles}
      contentLabel="Images modal"
    >
      <img src={image} alt={alt} />
    </Modal>
  );
};
