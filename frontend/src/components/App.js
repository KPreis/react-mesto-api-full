import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api.js';
import { register, authorization, validateToken, logout } from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { React, useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

function App() {
  const [cards, setData] = useState([]);
  const [currentUser, setDataProfile] = useState({ name: '', about: '', email: '' });
  const [card, setCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [statusRegister, setStatusRegister] = useState(false);

  useEffect(() => {
    checkToken();
  });

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfile()])
      .then(([initialCards, dataProfile]) => {
        setData(initialCards);
        setDataProfile(dataProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const history = useHistory();

  const handleCardClick = (card) => {
    setCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setCard(null);
    setIsInfoTooltipOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setData((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setData(cards.filter((result) => result._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = (profile) => {
    api
      .setProfile(profile)
      .then((result) => {
        setDataProfile(result);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar)
      .then((result) => {
        setDataProfile(result);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .sendNewCard(newCard)
      .then((result) => {
        setData([result, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRegister = (email, password) => {
    register(email, password)
      .then((result) => {
        setIsInfoTooltipOpen(true);
        if (result) {
          setStatusRegister(true);
          history.push('/sign-in');
        }
      })
      .catch((error) => {
        console.log(error);
        setStatusRegister(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const onLogin = (email, password) => {
    authorization(email, password)
      .then((result) => {
        if (result) {
          Promise.all([api.getInitialCards(), api.getProfile()])
          .then(([initialCards, dataProfile]) => {
            setData(initialCards);
            setDataProfile(dataProfile);
          })
          .catch((error) => {
            console.log(error);

          });
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        console.log(error);
      });
  };

  const checkToken = () => {
      validateToken()
        .then(() => {
          setLoggedIn(true);
          history.push('/');
        })
        .catch((error) => {
          if (error === 'Ошибка: 401') {
            history.push('/sign-in');
          }
          console.log(error);
        });
  };

  const onSignOut = () => {
    logout();
    history.push('/sign-in');
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header emailUserInHeader={currentUser.email} onSignOut={onSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              handleCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch>
          <Footer />
          <ImagePopup card={card} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            status={statusRegister}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
