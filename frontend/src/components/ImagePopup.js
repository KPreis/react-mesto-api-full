import React from 'react';
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`pop-up pop-up_image ${card && 'pop-up_opened'}`}
      id="imagePopup"
    >
      <figure className="pop-up__figure">
        <img
          className="pop-up__image"
          src={card ? card.link : 'https://mesto.kpreis.ru/images/taganay.jpeg'}
          alt={card ? card.name : 'Таганай'}
        />
        <figcaption className="pop-up__label">
          {card ? card.name : 'Таганай'}
        </figcaption>
        <button
          className="pop-up__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
