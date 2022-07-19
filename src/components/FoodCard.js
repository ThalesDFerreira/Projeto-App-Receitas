import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function FoodCard({ quantity, typeCard }) {
  const { redirectDetails, dataFiltered } = useContext(MyContext);
  return (
    <div className="d-flex flex-wrap ">
      {dataFiltered.map((item, index) => (
        index < quantity
        && (
          <button
            type="button"
            key={ typeCard === 'food'
              ? `${item.idMeal}${index}` : `${item.strDrink}${index}` }
            data-testid={ `${index}-recipe-card` }
            className="w-50 d-flex flex-column"
            onClick={ (e) => { redirectDetails(e); } }

          >
            <img
              src={ typeCard === 'food' ? item.strMealThumb : item.strDrinkThumb }
              name={ typeCard === 'food' ? item.idMeal : item.idDrink }
              data-testid={ `${index}-card-img` }
              alt={ typeCard === 'food' ? item.strMeal : item.strDrink }
              className="w-75 align-self-center"
            />
            <p
              data-testid={ `${index}-card-name` }
              className="align-self-center"
            >
              { typeCard === 'food' ? item.strMeal : item.strDrink }

            </p>
          </button>
        )
      ))}
    </div>
  );
}

FoodCard.propTypes = {
  quantity: PropTypes.number.isRequired,
  typeCard: PropTypes.string.isRequired,
};

export default FoodCard;
