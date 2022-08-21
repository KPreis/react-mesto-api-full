import React from 'react';
import { ReactComponent as SuccesIcon } from '../images/success-icon.svg';
import { ReactComponent as FailIcon } from '../images/fail-icon.svg';

const InfoTooltip = ({ isOpen, onClose, status }) => {
  return (
    <div className={`pop-up  ${isOpen && 'pop-up_opened'}`}>
      <div className="pop-up__tooltip">
        <div className="pop-up__tooltip-icon">
          {status ? <SuccesIcon /> : <FailIcon />}
        </div>
        <p className="pop-up__tooltip-message">
          {status
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button
          className="pop-up__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
