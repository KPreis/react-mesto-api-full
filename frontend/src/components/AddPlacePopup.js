import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name: name, link: link });
  };
  return (
    <PopupWithForm
      title={'Новое место'}
      id={'cardAddPopup'}
      textButton={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <input
          className="form__item"
          value={name}
          onChange={handleChangeName}
          id="cardNameField"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__item-error cardNameField-error"></span>
        <input
          className="form__item"
          value={link}
          onChange={handleChangeLink}
          id="cardLinkField"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__item-error cardLinkField-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
