import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Main({
  cards,
  handleCardClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-with-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="galary">
        <ul className="galary__cards-list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
