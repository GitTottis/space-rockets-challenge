import React from "react";

export const ACTIONS = {
  REMOVE_FAVORITE_LAUNCH: 'rm-fav-launch',
  ADD_FAVORITE_LAUNCH: 'add-fav-launch',
  REMOVE_FAVORITE_PAD: 'rm-fav-pad',
  ADD_FAVORITE_PAD: 'add-fav-pad',
  CLEAR_FAVORITE_LAUNCHES: 'clear-launches',
  CLEAR_FAVORITE_PADS: 'clear-launches'
}

function favoritesReducer(favorites, action) {

  switch (action.type) {
    case ACTIONS.REMOVE_FAVORITE_LAUNCH: {
      delete favorites[action.payload.flight_number.toString()]
      
      console.log("favorites", favorites)
      return favorites
    }
    case ACTIONS.ADD_FAVORITE_LAUNCH: {
      favorites[action.payload.flight_number.toString()] = action.payload
      console.log("favorites", favorites)
      return favorites
    }
    case ACTIONS.REMOVE_FAVORITE_PAD: {
      delete favorites[action.payload.site_id.toString()]
      console.log("favorites", favorites)
      return favorites
    }
    case ACTIONS.ADD_FAVORITE_PAD: {
      favorites[action.payload.site_id.toString()] = action.payload
      console.log("favorites", favorites)
      return favorites
    }
    case ACTIONS.CLEAR_FAVORITE_LAUNCHES:
      return {}
    case ACTIONS.CLEAR_FAVORITE_PADS:
      return {}
    default:
      return favorites
  }
}

export function useFavoritesState(key) {
    const [favourites, setFavourites] = React.useReducer( favoritesReducer, {},  () => {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : {}
    });

    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(favourites));
    });
    return [favourites, setFavourites];
}
