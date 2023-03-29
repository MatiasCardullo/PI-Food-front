import axios from "axios";

import {
  GET_ALL_RECIPES_HOME,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  ORDER_ALPHABETIC_ASC,
  ORDER_ALPHABETIC_DES,
  ORDER_BY_HIGH_SCORE,
  ORDER_BY_LOW_SCORE,
  FILTER_RECIPES_BY_DIET,
  GET_TYPES_OF_DIET,
  POST_RECIPE,
  DELETE_RECIPE,
  RESET
} from "./types";

const { BASEURL } = process.env

export const getAllRecipesHome = () => (dispatch) => {
  return fetch(BASEURL + "/recipes")
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: GET_ALL_RECIPES_HOME,
        payload: json,
      });
    })
    .catch((error) => console.error(error));
};

export const getRecipeByID = (id) => (dispatch) => {
  return fetch(BASEURL + "/recipes/" + id)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: GET_RECIPE_BY_ID,
        payload: json,
      });
    })
    .catch((error) => {
      alert("ID not found");
    });
};

export const getRecipeByName = (name) => (dispatch) => {
  return fetch(BASEURL + "/recipes?name=" + name)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: json,
      });
    })
    .catch((error) => {
      alert("This recipes is not found");
    });
};

export function getTypesOfDiets() {
  return async (dispatch) => {
    try {
      const json = await axios.get(BASEURL + "/types");
      return dispatch({
        type: GET_TYPES_OF_DIET,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function postRecipe(payload) {
  return async (dispatch) => {
    try {
      const json = await axios.post(BASEURL + "/recipe", payload);
      return dispatch({
        type: POST_RECIPE,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const orderAlphabetic = () => {
  return {
    type: ORDER_ALPHABETIC_ASC,
  };
};

export const orderAlphabeticDesc = () => {
  return {
    type: ORDER_ALPHABETIC_DES,
  };
};

export const orderScore = () => {
  return {
    type: ORDER_BY_HIGH_SCORE,
  };
};

export const orderScoreLow = () => {
  return {
    type: ORDER_BY_LOW_SCORE,
  };
};

export const filterRecipesByDiet = (payload) => {
  console.log(payload);
  return {
    type: FILTER_RECIPES_BY_DIET,
    payload,
  };
};

export const deleteRecipe = (id) => {
  return async function (dispatch) {
    await axios.delete(BASEURL + "/recipes/" + id);
    return dispatch({
      type: DELETE_RECIPE,
    });
  };
};

export const reset = () => {
  return (dispatch) => {
    dispatch({ type: RESET })
  }
}