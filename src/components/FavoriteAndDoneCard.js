import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import ShareAndFavorite from './ShareAndFavorite';

function FavoriteAndDoneCard({ dataProps, pageProps }) {
  const { redirectDetails } = useContext(MyContext);
  const pathnameFood = '/foods/';
  const pathnameDrink = '/drinks/';

  const [dataBase, setDataBase] = useState(dataProps);

  const filterAll = () => {
    setDataBase(dataProps);
  };

  const filterFoods = () => {
    const dataFoods = dataProps.filter((item) => item.type === 'food');
    setDataBase(dataFoods);
  };

  const filterDrinks = () => {
    const dataDrinks = dataProps.filter((item) => item.type === 'drink');
    setDataBase(dataDrinks);
  };

  const getData = () => {
    if (pageProps === 'favorite-recipes') {
      const dataStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setDataBase(dataStorage);
    } else {
      const dataStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      setDataBase(dataStorage);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDataBase(dataProps);
  }, [dataProps]);

  return (
    <>
      <button data-testid="filter-by-all-btn" type="button" onClick={ filterAll }>
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterFoods }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      <div
        className="d-flex flex-wrdataap "
      >
        {dataBase.map((item, index) => (
          <div
            className="d-flex flex-wrap"
            data-testid={ `receitas-cards-${item.id}` }
            key={ item.image }
          >
            <button
              type="button"
              key={ `${item.id}${index}` }
              data-testid={ `${index}-recipe-card` }
              className="w-50 d-flex flex-column"
              name={ item.name }
              onClick={ () => {
                redirectDetails(item.id, item.type);
              } }
            >
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ item.name }
                className="w-75 align-self-center"
              />
              <p
                data-testid={ `${index}-horizontal-name` }
                className="align-self-center"
              >
                {item.name}
              </p>

              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.nationality}
                {item.alcoholicOrNot}
                {' '}
                -
                {' '}
                {item.category}
              </p>
              {pageProps === 'done-recipes' && (
                <>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {item.date}
                  </p>
                  <p data-testid={ `${index}-${tagName}-horizontal-tag` }>
                    {item.tags}
                  </p>
                </>
              )}
            </button>
            <ShareAndFavorite
              linkCopy={
                item.type === 'food'
                  ? `${pathnameFood}${item.id}`
                  : `${pathnameDrink}${item.id}`
              }
              type={ item.type }
              id={ item.id }
              area={ item.nationality }
              category={ item.category }
              alcoholic={ item.alcoholicOrNot }
              name={ item.name }
              image={ item.image }
              testid={ `${index}-horizontal-share-btn` }
              favtestid={ `${index}-horizontal-favorite-btn` }
            />
          </div>
        ))}
      </div>
    </>
  );
}

FavoriteAndDoneCard.propTypes = {
  dataProps: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  pageProps: PropTypes.string.isRequired,
};

export default FavoriteAndDoneCard;
