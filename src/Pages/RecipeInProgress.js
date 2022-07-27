import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareAndFavorite from '../components/ShareAndFavorite';
import ContextRecipe from '../context/ContextRecipe';
import ListCheck from '../components/ListCheck';

function RecipesInProgress({
  match: {
    params: { id },
  },
  location: { pathname },
}) {
  const {
    dataRecipe,
    ingredientData,
    doneRecipesStorage,
    setDoneRecipesStorage,
    // recipesInProgress,
    ingredientsContinue,
    setIngredientsContinue,
    fetchRecipe,
  } = useContext(ContextRecipe);
  const history = useHistory();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [ingredientCheckedName, setIngredientCheckedName] = useState([]);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const onHandleCheck = ({ target: { checked, name } }) => {
    if (checked) {
      setIngredientCheckedName([...ingredientCheckedName, name]);
      localStorage.setItem('doneIngredients', JSON.stringify({
        ...ingredientsContinue,
        [id]: [...ingredientCheckedName, name],
      }));
    } else {
      const filterIngredients = ingredientCheckedName.filter((item) => (item !== name));
      localStorage.setItem('doneIngredients', JSON.stringify({
        ...ingredientsContinue,
        [id]: filterIngredients,
      }));
      setIngredientCheckedName(filterIngredients);
    }
  };

  useEffect(() => {
    fetchRecipe(id, 'food');
    if (localStorage.getItem('doneIngredients')
      && JSON.parse(localStorage.getItem('doneIngredients'))[id]) {
      const result = JSON.parse(localStorage.getItem('doneIngredients'));
      setIngredientsContinue(result);
      setIngredientCheckedName(result[id]);
    }
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipesStorage(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  useEffect(() => {
    if (dataRecipe[0] !== undefined) {
      if (ingredientCheckedName.length === ingredientData.length) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
      setIngredientsContinue({
        ...ingredientsContinue,
        [id]: ingredientCheckedName,
      });
    }
  }, [ingredientCheckedName]);

  const sendDoneToStorage = () => {
    const objDone = {
      id,
      type: 'food',
      nationality: dataRecipe[0].strArea,
      category: dataRecipe[0].strCategory,
      alcoholicOrNot: '',
      name: dataRecipe[0].strMeal,
      image: dataRecipe[0].strMealThumb,
      doneDate: today.toLocaleDateString(),
      tags: dataRecipe[0].strTags.split(','),
    };
    setDoneRecipesStorage([...doneRecipesStorage, objDone]);
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipesStorage, objDone]));
  };

  return (
    dataRecipe[0] !== undefined

    && (
      <div
        className="bg-slate-100"
      >
        <img
          className="w-screen
          rounded-lg
          "
          data-testid="recipe-photo"
          src={ dataRecipe[0].strMealThumb }
          alt={ dataRecipe[0].strMeal }
        />
        <div
          className="d-flex justify-content-between
          my-3
          mx-2
          "
        >
          <div
            className="mx-3"
          >
            <p
              data-testid="recipe-title"
              className="text-3xl m-0"
            >
              {dataRecipe[0].strMeal}
            </p>
            <p data-testid="recipe-category">{dataRecipe[0].strCategory}</p>
          </div>
          <ShareAndFavorite
            linkCopy={ pathname.replace('/in-progress', '') }
            type="food"
            id={ id }
            area={ dataRecipe[0].strArea }
            category={ dataRecipe[0].strCategory }
            alcoholic=""
            name={ dataRecipe[0].strMeal }
            image={ dataRecipe[0].strMealThumb }
            testid="share-btn"
            favtestid="favorite-btn"
          />
        </div>
        <ul
          className="mx-4"
        >
          <p
            className="text-2xl"
          >
            Ingredients
          </p>
          {ingredientData.map((ingredi, index) => (
            <ListCheck
              id={ id }
              key={ index }
              item={ ingredi }
              index={ index }
              onChange={ (e) => onHandleCheck(e) }
              nameRecipe={ dataRecipe[0].strMeal }
            />
          ))}
        </ul>
        <div
          className="mx-3
            text-justify
            mb-12
            "
        >
          <p
            className="text-2xl"
          >
            Instructions
          </p>
          <p
            data-testid="instructions"
          >
            {dataRecipe[0].strInstructions}
          </p>
        </div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="fixed-bottom
                disabled:bg-red-400
                bg-red-500
                py-2
                text-white
                text-2xl
                "
          onClick={ () => {
            sendDoneToStorage();
            history.push('/done-recipes');
          } }
          disabled={ btnDisabled }
        >
          Finalizar Receita
        </button>
      </div>
    )
  );
}

RecipesInProgress.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default RecipesInProgress;
