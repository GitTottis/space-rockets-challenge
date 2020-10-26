import React from "react";

export function useFavoritesState(key) {
    const [favourites, setFavourites] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : {};
    });

    React.useEffect(() => {
      const data = localStorage.getItem(key)
      if (data) {
        setFavourites(JSON.parse(data))
      }
    }, [key])

    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(favourites));
    });
    return [favourites, setFavourites];
}
