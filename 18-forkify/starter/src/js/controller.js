import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id); // don't forget to await an async fcn

    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  console.log('COnTROLLING seARCH !!!!!!!!!');
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();
    // if (!query) return;
    if (!query)
      return resultsView.renderError(
        'Empty search! Please enter something to search for',
      ); // my change to fix his spinner bug on empty search. probably violated mvc principles but works

    // load search results
    await model.loadSearchResults(query);

    // render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1)); // added 1 to fix bug where new search doesn't reset pagination

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (page) {
  // render new results. remember this updates current page
  resultsView.render(model.getSearchResultsPage(page));

  // render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function () {};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
