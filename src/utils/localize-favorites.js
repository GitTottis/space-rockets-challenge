// import React from "react";

// export const ACTIONS = {
//   REMOVE_FAVORITE: 'rm-fav',
//   ADD_FAVORITE: 'add-fav',
//   CLEAR_FAVORITES: 'clr-favs'
// }

// function favoritesReducer(favorites, action) {
//   switch (action.type) {
//     case ACTIONS.REMOVE_FAVORITE_LAUNCH: {
//       delete favorites[action.payload.flight_number.toString()]
//       console.log("favorites 1", favorites)
//       window.localStorage.setItem('favouriteLaunches', JSON.stringify(favorites))
//       return favorites
//     }
//     case ACTIONS.ADD_FAVORITE_LAUNCH: {
//       favorites[action.payload.flight_number.toString()] = action.payload
//       console.log("favorites 2", favorites)
//       window.localStorage.setItem('favouriteLaunches', JSON.stringify(favorites))
//       return favorites
//     }
//     case ACTIONS.CLEAR_FAVORITE:
//       return {}
//     default:
//       return favorites
//   }
// }

// export function useFavoritesState(key) {
//     const [favourites, setFavourites] = React.useReducer( favoritesReducer, {},  () => {
//       const data = localStorage.getItem(key)
//       return data ? JSON.parse(data) : {}
//     });
//     // React.useEffect(() => {
//     //   window.localStorage.setItem(key, JSON.stringify(favourites));
//     // });
//     return [favourites, setFavourites];
// }
