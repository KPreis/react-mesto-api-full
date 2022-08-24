import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, handleCardClick, handleCardLike, handleCardDelete }) {
  const onCardClick = () => {
    handleCardClick(card);
  };
  const onCardLike = () => {
    handleCardLike(card);
  };

  const onDeleteCardClick = () => {
    handleCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = currentUser._id === card.owner;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  return (
    <li className="card" key={card._id}>
      <button
        className={`card__delete ${isOwner && 'card__delete_visible'}`}
        onClick={onDeleteCardClick}
        type="button"
      ></button>
      <div className="card__img-container">
        <img
          className="card__img"
          alt={card.name}
          src={card.link}
          onClick={onCardClick}
        />
      </div>
      <div className="card__description">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-block">
          <button
            className={`card__like ${isLiked && 'card__like_active'}`}
            onClick={onCardLike}
            type="button"
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
