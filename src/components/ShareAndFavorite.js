import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

function ShareAndFavorite() {
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ favoriteIcon } alt="Favorite" />
      </button>
    </div>
  );
}

export default ShareAndFavorite;
