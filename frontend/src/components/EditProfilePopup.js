import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      id={'profileEditPopup'}
      name={'profileEdit'}
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
          id="profileNameEditField"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__item-error profileNameEditField-error"></span>
        <input
          className="form__item"
          value={description}
          onChange={handleChangeDescription}
          id="profileDescriptionEditField"
          type="text"
          name="description"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="form__item-error profileDescriptionEditField-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
