import { FC } from "react";
import Modal from 'react-modal';
import styles from './MyModal.module.scss'
import closeIcon from '../../../public/icons/close.svg'

interface Props {
  modalIsOpen: boolean,
  closeModal: () => void,
  title: string,
  modalContent: React.ReactNode
}

const MyModal:FC<Props> = ({modalIsOpen, closeModal, title, modalContent}) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '16px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '500px',
    }
  };

  return (
      <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 className={styles['modal__title']}>{title}</h2>
      <div className={styles['modal__close']} onClick={closeModal}>
        <img src={closeIcon} alt="closeIcon" />
      </div>

      {modalContent}
    </Modal>
  )
}

export default MyModal