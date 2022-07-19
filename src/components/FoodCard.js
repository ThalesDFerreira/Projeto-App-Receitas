import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function FoodCard({ base, quantity, page, typeCard }) {
  const { redirectDetails } = useContext(MyContext);
  return (
    <div className="d-flex flex-wrap ">
      {base.map((item, index) => (
        index < quantity
        && (
          <button
            type="button"
            key={ typeCard === 'food'
              ? `${item.idMeal}${index}` : `${item.strDrink}${index}` }
            data-testid={ page === 'principal'
              ? `${index}-recipe-card` : `${index}-recomendation-card` }
            className="w-50 d-flex flex-column"
            onClick={ page === 'principal'
              ? ((e) => { redirectDetails(e); }) : undefined }

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
  base: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantity: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  typeCard: PropTypes.string.isRequired,
};

export default FoodCard;
