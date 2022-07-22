import React, { useContext } from 'react';
import './Style.css';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function ListCheck({ item, index, onChange }) {
  const { measureIngredientData, ingredientData } = useContext(ContextRecipe);
  return (
    <li className="todo__item">
      <label
        htmlFor={ `${item}${index}` }
        className="todo__item d-flex align-self-baseline"
      >

        <input
          id={ `${item}${index}` }
          className="todo__item mx-2"
          name={ item }
          type="checkbox"
          key={ item }
          data-testid={ `${index + 1}-ingredient-step` }
          onChange={ onChange }
        />
        <p>
          {`${ingredientData[index]} - ${measureIngredientData[index]}`}

        </p>
      </label>
    </li>
  );
}

ListCheck.propTypes = {
  item: PropTypes.string,
}.isRequired;

export default ListCheck;
