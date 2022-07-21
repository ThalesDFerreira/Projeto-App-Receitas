import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function ListCheck({ item, index }) {
  const { measureIngredientData } = useContext(ContextRecipe);
  return (
    <div>
      <input
        type="checkbox"
        key={ item }
        data-testid={ `${index + 1}-ingredient-step` }
      />
      <label htmlFor="User">
        {`${item} - ${measureIngredientData[index]}`}
      </label>
    </div>
  );
}

ListCheck.propTypes = {
  item: PropTypes.string,
}.isRequired;

export default ListCheck;
