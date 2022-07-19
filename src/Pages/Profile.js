import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Profile() {
  const { userData, handleDoneRecipes,
    handleFavoriteRecipes, localClear } = useContext(MyContext);

  const getUserStorage = () => {
    const result = JSON.parse(localStorage.getItem('user')).email;
    return result;
  };

  useEffect(() => {
    getUserStorage();
  }, []);

  return (
    <>
      <Header titlePage="Profile" hasSearch={ false } />
      <Footer />
      <p data-testid="profile-email">
        {getUserStorage()}

      </p>
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ localClear }
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
