import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Profile() {
  const { userData, handleDoneRecipes,
    handleFavoriteRecipes, localClear } = useContext(MyContext);

  return (
    <>
      <Header titlePage="Profile" hasSearch={ false } />
      <Footer />
      <h1 data-testid="profile-email">
        {userData.email}

      </h1>
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipes }
      >
        DoneRecipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteRecipes }
      >
        FavoriteRecipes
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
