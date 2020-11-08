import React, { useReducer, createContext, useContext } from 'react'

export const ACTIONS = {
    REMOVE_FAVORITE: 'rm-fav',
    ADD_FAVORITE: 'add-fav',
    CLEAR_FAVORITES: 'clr-favs'
}

const FavoritesContext = createContext()
const FavoritesUpdateContext = createContext()

export function useFavoritesContext() {
    return useContext(FavoritesContext)
}

export function useFavoritesUpdateContext() {
    return useContext(FavoritesUpdateContext)
}

export default function FavoritesContextProvider({ children }) {
    function favoritesReducer(favourites, action) {
        let fav_key = action.payload ? action.payload.type === 'launch' ? action.payload.flight_number.toString() : action.payload.site_id.toString() : null
        switch (action.type) {
            case ACTIONS.REMOVE_FAVORITE: {
                window.localStorage.setItem('favourites', JSON.stringify(favourites))
                delete favourites[fav_key]
                return favourites
            }
            case ACTIONS.ADD_FAVORITE: {
                window.localStorage.setItem('favourites', JSON.stringify(favourites))
                favourites[fav_key] = action.payload
                return favourites
            }
            case ACTIONS.CLEAR_FAVORITES:
                return {}
            default:
                return favourites
        }
    }

    // export function useFavoritesState(key) {
      const [favourites, setFavourites] = useReducer( favoritesReducer, {},  () => {
        // return data ? JSON.parse(data) : {}
        // const data = localStorage.getItem(key)
        return {}
      });

    return (
        <FavoritesContext.Provider value={favourites}>
            <FavoritesUpdateContext.Provider value={setFavourites}>
                { children }
            </FavoritesUpdateContext.Provider>
        </FavoritesContext.Provider>
    )
}