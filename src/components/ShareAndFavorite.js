import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import BASE_URL from '../helpers';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;

function ShareAndFavorite({ linkCopy }) {
  const [showCopy, setShowCopy] = useState(false);

  const intervalMensage = () => {
    copy(`${BASE_URL}${linkCopy}`);
    setShowCopy(true);
  };

  useEffect(() => {
    if (showCopy) {
      setTimeout(() => {
        setShowCopy(false);
      }, TWO_SECONDS);
    }
  }, [showCopy]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          intervalMensage();
        } }

      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ favoriteIcon } alt="Favorite" />
      </button>
      {showCopy
      && <p>Link copied!</p>}
    </div>
  );
}

ShareAndFavorite.propTypes = {
  linkCopy: PropTypes.string.isRequired,
};

export default ShareAndFavorite;
