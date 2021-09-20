import "./card.scss";
import { Heading, TextContainer } from "@shopify/polaris";
import { SpaceContext } from "../../context";
import { useContext } from "react";

import { ModalContentType } from "../../context";
const localFavorites = localStorage.getItem("nasaFaves");

const Card = (props: ModalContentType) => {
  const { setModalState, fillModalContent, addToFavorite, removeFromFavorite } =
    useContext(SpaceContext);

  const handleClick = () => {
    fillModalContent(props);
    setModalState(true);
  };

  let isFavorited = false;

  if (localFavorites) {
    isFavorited = JSON.parse(localFavorites).some(
      (fav: ModalContentType) => fav.id === props.id
    );
  }

  const handleAddToFavorites = () => {
    isFavorited ? removeFromFavorite(props) : addToFavorite(props);
  };
  return (
    <div className='card'>
      <div className='img-container' onClick={handleClick}>
        <img src={props.mediaSrc} alt='' loading='lazy' />
      </div>
      <div className='text-container'>
        <TextContainer spacing='tight'>
          <Heading>{props.header}</Heading>
          {props.description.length > 75 ? (
            <p className='text-description'>
              {props.description.slice(0, 75) + "..."}

              <span
                onClick={handleClick}
                style={{ color: "blue", cursor: "pointer" }}>
                view more
              </span>
            </p>
          ) : (
            <p className='text-description'>{props.description}</p>
          )}
          <div className='text-date'>
            <span className='date'>
              {new Date(props.date).toString().split(" ").slice(0, 4).join(" ")}
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
  );
};

export default Card;
