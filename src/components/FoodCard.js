import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import FilterCard from './Filter';

function FoodCard() {
  const { dataFiltered, typeFood, redirectDetails } = useContext(MyContext);
  const twelve = 12;
  return (
    <>
      <FilterCard />
      <div className="d-flex flex-wrap ">
        {dataFiltered.map((item, index) => (
          index < twelve
        && (
          <button
            type="button"
            key={ typeFood === 'food' ? item.idMeal : item.strDrink }
            data-testid={ `${index}-recipe-card` }
            className="w-50 d-flex flex-column"
            onClick={ (e) => { redirectDetails(e); } }

          >
            <img
              src={ typeFood === 'food' ? item.strMealThumb : item.strDrinkThumb }
              name={ typeFood === 'food' ? item.idMeal : item.idDrink }
              data-testid={ `${index}-card-img` }
              alt={ typeFood === 'food' ? item.strMeal : item.strDrink }
              className="w-75 align-self-center"
            />
            <p
              data-testid={ `${index}-card-name` }
              className="align-self-center"
            >
              { typeFood === 'food' ? item.strMeal : item.strDrink }

            </p>
          </button>
        )
        ))}
      </div>
    </>
  );
}

export default FoodCard;
