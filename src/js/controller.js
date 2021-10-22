import * as model from './model.js';
import recipeView from './views/recipeView.js';
import recipeIngredientsAndDirectionsView from './views/recipeIngredientsAndDirectionsView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookamrksView from './views/bookamrksView.js';
import addRecipeView from './views/addRecipeView.js';
import darkModeView from './views/darkModeView.js';

import 'regenerator-runtime/runtime'; // polyfilling ES6 async-await
import 'core-js/stable'; // polyfilling all the other ES6 syntax
import { async } from 'regenerator-runtime';

// Parcel's Hot Module Replacement
// if (module.hot) {
//   module.hot.accept();
// }

const controlSearchResults = async function () {
  try {
    // 1 Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // 2 render spinner
    resultsView.renderSpinner();

    // 3 load Search query
    await model.loadSearchResults(query);

    //  4 render results
    if (model.state.search.results.length === 0) resultsView.renderError();
    else resultsView.render(model.getSearchResultsPage());

    // 5 Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlRecipes = async function () {
  // Loading recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Loading spinner
    recipeView.renderSpinner();
    recipeIngredientsAndDirectionsView.renderSpinner();

    // loading Recipe;
    await model.loadRecipe(id);

    //  Rendering recipe
    recipeView.render(model.state.recipe);
    recipeIngredientsAndDirectionsView.render(model.state.recipe);

    // update results view to add an active class to the selected result
    resultsView.update(model.getSearchResultsPage());

    // update bookmaks to show correct active class on it
    bookamrksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(); // value goes in from the default parameter
    recipeIngredientsAndDirectionsView.renderError(); // value goes in from the default parameter
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //   Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //  Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1 update the recipe servings and ingredients' quantity (in state)
  model.updateServings(newServings);

  // 2 update recipe view
  recipeView.update(model.state.recipe);
  recipeIngredientsAndDirectionsView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1 add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2 update recipe view
  recipeView.update(model.state.recipe);
  recipeIngredientsAndDirectionsView.update(model.state.recipe);

  // 3 render bookmarks
  if (model.state.bookmarks.length === 0) bookamrksView.renderError();
  else bookamrksView.render(model.state.bookmarks);
};

const controlBookmasrs = function () {
  if (model.state.bookmarks.length === 0) bookamrksView.renderError();
  else bookamrksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Show success message after a recipe is uploaded
    addRecipeView.renderSuccessMessage();

    // Rendering own recipe
    recipeView.render(model.state.recipe);
    recipeIngredientsAndDirectionsView.render(model.state.recipe);

    // To change an ID in URL while adding an own recipe
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Rendering updated own recipe in bookmarks
    bookamrksView.render(model.state.bookmarks);
  } catch (err) {
    console.error('🌎', err);
    addRecipeView.renderError(err.message);
  }
};

const controlUpdateModesBtnClick = function () {
  if (model.state.bookmarks.length === 0) bookamrksView.renderError();
  else bookamrksView.render(model.state.bookmarks);

  paginationView.update(model.state.search);

  resultsView.render(model.getSearchResultsPage());
  const id = window.location.hash.slice(1);
  if (!id) return;

  bookamrksView.update(model.state.bookmarks);
  recipeView.update(model.state.recipe);
  recipeIngredientsAndDirectionsView.update(model.state.recipe);
};

const init = function () {
  bookamrksView.addHandlerRender(controlBookmasrs);

  recipeView.addHandlerRender(controlRecipes);
  recipeIngredientsAndDirectionsView.addHandlerRender(controlRecipes);

  recipeView.addHandlerUpdateServings(controlServings);
  recipeIngredientsAndDirectionsView.addHandlerUpdateServings(controlServings);

  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeIngredientsAndDirectionsView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  darkModeView.toggleModes(controlUpdateModesBtnClick);
};
init();
