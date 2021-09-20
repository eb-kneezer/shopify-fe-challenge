import { Heading, TextContainer } from "@shopify/polaris";
import { useContext } from "react";
import { ModalContentType, SpaceContext } from "../../context";
import "./modal.scss";

const Modal = () => {
  const {
    modalState,
    setModalState,
    modalContent,
    addToFavorite,
    removeFromFavorite,
  } = useContext(SpaceContext);

  const localFavorites = localStorage.getItem("nasaFaves");

  const handleClose = () => {
    setModalState(false);
  };

  let isFavorited = false;

  if (localFavorites) {
    isFavorited = JSON.parse(localFavorites).some(
      (fav: ModalContentType) => fav.id === modalContent.id
    );
  }

  const handleAddToFavorites = () => {
    isFavorited
      ? removeFromFavorite(modalContent)
      : addToFavorite(modalContent);
  };

  return (
    <div className={`modal ${modalState ? "active" : ""}`}>
      <div className='modal__container'>
        <button onClick={handleClose}>
          <i className='fas fa-times'></i>
        </button>
        <div className='modal__media'>
          <img src={modalContent.mediaSrc} alt='' />
        </div>
        <div className='modal__content'>
          <TextContainer spacing='tight'>
            <Heading>{modalContent.header}</Heading>
            <p className='text-description'>{modalContent.description}</p>
            <div className='text-date'>
              <span className='date'>
                {new Date(modalContent.date)
                  .toString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
              </span>
              <span
                onClick={handleAddToFavorites}
                className={`fave ${isFavorited ? "liked" : ""}`}>
                <i className='fas fa-heart'></i>
              </span>
            </div>
          </TextContainer>
        </div>
      </div>
    </div>
  );
};

export default Modal;
