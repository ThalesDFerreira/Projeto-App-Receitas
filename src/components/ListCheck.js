import React, { useContext } from 'react';
import './Style.css';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function ListCheck({ item, index, onChange }) {
  const {
    measureIngredientData,
    ingredientData,
  } = useContext(ContextRecipe);

  // const verifyIngredientesChecked = () => {
  //   if (ingredientsContinue[nameRecipe]) {
  //     const verifyNamesIngredients = ingredientsContinue[nameRecipe].some(
  //       (el) => el === item,
  //     );
  //     return verifyNamesIngredients;
  //   }
  // };

  // useEffect(() => {
  //   verifyIngredientesChecked();
  // }, [ingredientsContinue]);

  return (
    <li className="todo__item">
      <label
        htmlFor={ `${item}${index}` }
        className="todo__item d-flex align-self-baseline"
        data-testid={ `${index}-ingredient-step` }

      >
        <input
          // checked={ verifyIngredientesChecked }
          id={ `${item}${index}` }
          className="todo__item mx-2"
          name={ item }
          type="checkbox"
          key={ item }
          onChange={ onChange }
        />
        <p>{`${ingredientData[index]} - ${measureIngredientData[index]}`}</p>
      </label>
    </li>
  );
}

ListCheck.propTypes = {
  item: PropTypes.string,
}.isRequired;

export default ListCheck;
