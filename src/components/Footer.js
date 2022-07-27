import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.png';
import mealIcon from '../images/mealIcon.png';

function Footer() {
  const { setTypeFood } = useContext(MyContext);
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="w-100 fixed-bottom
      bg-red-400
      flex
      justify-between
      py-2
      px-2
      "
    >
      <button
        type="button"
        onClick={ () => { setTypeFood('drink'); history.push('/drinks'); } }
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img
          src={ drinkIcon }
          alt="Drink Icon"
          className="w-2/3"
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
          className="block w-2/3 float-right"
        />
      </button>
    </footer>
  );
}

export default Footer;
