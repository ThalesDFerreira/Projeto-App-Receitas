import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Profile() {
  const { handleDoneRecipes,
    handleFavoriteRecipes, localClear } = useContext(MyContext);

  const getUserStorage = () => {
    if (localStorage.getItem('user')) {
      const result = JSON.parse(localStorage.getItem('user')).email;
      return result;
    } return '';
  };

  // useEffect(() => {
  //   getUserStorage();
  // }, []);

  return (
    <>
      <Header titlePage="Profile" hasSearch={ false } />
      <Footer />
      <div
        className="px-2
        my-4
        "
      >
        <p
          className="text-center
          text-slate-600
          "
        >
          USER
        </p>
        <p
          data-testid="profile-email"
          className="text-2xl text-center
          text-slate-600
          "
        >
          {getUserStorage()}
        </p>
      </div>
      <br />
      <div
        className="flex flex-col
        items-center
        "
      >

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleDoneRecipes }
          className="login-button
        w-2/3
        py-1
        rounded-lg
        bg-red-400
        text-white
        m-2
        "
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleFavoriteRecipes }
          className="login-button
        w-2/3
        py-1
        rounded-lg
        bg-red-400
        text-white
        m-2

        "
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ localClear }
          className="login-button
        w-2/3
        py-1
        rounded-lg
        bg-red-700
        text-white
        m-2
        "
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
