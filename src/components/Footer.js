import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { setTypeFood } = useContext(MyContext);
  const history = useHistory();
  return (
    <footer data-testid="footer" className="w-100 fixed-bottom">
      <button
        type="button"
        onClick={ () => { setTypeFood('drink'); history.push('/drinks'); } }
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }

      >
        <img
          src={ drinkIcon }
          alt="Drink Icon"
        />
      </button>
      <button
        type="button"
        onClick={ () => { setTypeFood('food'); history.push('/foods'); } }
        data-testid="food-bottom-btn"
        src={ mealIcon }

      >
        <img
          src={ mealIcon }
          alt="Meal Icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
