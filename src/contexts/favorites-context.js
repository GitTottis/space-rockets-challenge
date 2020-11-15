import React, { useReducer, createContext, useContext } from 'react'

export const ACTIONS = {
    REMOVE_FAVORITE: 'rm-fav',
    ADD_FAVORITE: 'add-fav',
    INIT_FAVORITES: 'init-fav',
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
        let fav_key = action.payload && [ACTIONS.REMOVE_FAVORITE, ACTIONS.ADD_FAVORITE].includes(action.type) ? action.payload.type === 'launch' ? action.payload.flight_number.toString() : action.payload.site_id.toString() : null
 
        switch (action.type) {
            case ACTIONS.REMOVE_FAVORITE: {
                delete favourites[fav_key]
                break;
            }
            case ACTIONS.ADD_FAVORITE: {
                favourites[fav_key] = action.payload
                break;
            }
            case ACTIONS.INIT_FAVORITES: {
                favourites = action.payload
                break;
            }
            case ACTIONS.CLEAR_FAVORITES: {
                favourites={}
                break;
            }
            default: {
                favourites={}
                break;
            }
        }

        window.localStorage.setItem('favourites', JSON.stringify(favourites))
        return favourites
    }

    // export function useFavoritesState(key) {
    const [favourites, setFavourites] = useReducer( favoritesReducer, {},  () => {
        return {}
    });

    return (
        <FavoritesContext.Provider value={ favourites }>
            <FavoritesUpdateContext.Provider value={ setFavourites }>
                { children }
            </FavoritesUpdateContext.Provider>
        </FavoritesContext.Provider>
    )
}