import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
    inputRef.current.value = '';
  };
  return (
    <PopupWithForm
      title={'Обновить аватар'}
      id={'avatarUpdatePopup'}
      name={'avatarUpdate'}
      textButton={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <input
          className="form__item"
          ref={inputRef}
          id="avatarLinkField"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__item-error avatarLinkField-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
