import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipesInProgress from './Pages/RecipeInProgress';
import Recipe from './Pages/Recipe';
import Drink from './Pages/Drink';
import DrinkInProgress from './Pages/DrinkInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Recipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:iddareceita" component={ Recipe } />
        <Route exact path="/drinks/:iddareceita" component={ Drink } />
        <Route
          exact
          path="/foods/:id-da-receita/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ DrinkInProgress }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
