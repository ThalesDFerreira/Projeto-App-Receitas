import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function FilterCard() {
  const dataPressed = { Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
    'Ordinary Drink': false,
    Cocktail: false,
    Shake: false,
    'Other/Unknown': false,
    Cocoa: false,
  };
  const { categoriesFilter,
    filterFood, resetFood,
    handleButtonFilter } = useContext(MyContext);
  const five = 5;
  const [paramTrueOrFalse, setParamTrueOrFalse] = useState(true);
  const [categoriesMealToggle, setCategoriesMealToggle] = useState('');
  const [nameSelected, setNameSelected] = useState('');
  const [buttonPressed, setButtonPressed] = useState({ Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
    'Ordinary Drink': false,
    Cocktail: false,
    Shake: false,
    'Other/Unknown': false,
    Cocoa: false,
  });

  const handleCategories = ({ target: { name } }) => {
    setNameSelected(name);
    setButtonPressed({ ...dataPressed, [name]: !buttonPressed[name] });
    if (categoriesMealToggle !== '') {
      setCategoriesMealToggle({ [name]: !categoriesMealToggle[name] });
    } else {
      setCategoriesMealToggle({ [name]: paramTrueOrFalse });
      setParamTrueOrFalse(!paramTrueOrFalse);
    }
  };

  useEffect(() => {
    filterFood(categoriesMealToggle, nameSelected);
  }, [categoriesMealToggle]);

  return (
    <div
      className="flex flex-wrap m-1"
    >
      {categoriesFilter.map((cat, index) => (
        index < five
    && (
      <button
        name={ cat.strCategory }
        key={ `${cat.strCategory}${index}` }
        type="button"
        value={ cat.strCategory }
        className={ `
          bg-slate-400
          px-2
          rounded-lg
          text-white
          m-1
        ${buttonPressed[cat.strCategory] === true
        && 'bg-slate-600'}` }
        data-testid={ `${cat.strCategory}-category-filter` }
        onClick={ (e) => { handleCategories(e); } }
      >
        {cat.strCategory}
      </button>
    )
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        name="filterButton"
        onClick={ (e) => { resetFood(e); handleButtonFilter(e); } }
        className="
        w-fit
          bg-slate-400
          px-2
          rounded-lg
          text-white
          m-1
          "
      >
        All
      </button>
    </div>
  );
}

export default FilterCard;
