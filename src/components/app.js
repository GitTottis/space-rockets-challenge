import React from "react";
import { Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/auth-context"
import AuthRoute from "./auth"
import Launches from "./missions/launches";
import Launch from "./missions/launch";
import LaunchPads from "./missions/launch-pads";
import LaunchPad from "./missions/launch-pad";
import Home from "./home";
import NavBar from "./navbar"
import FavoritesContextProvider from "../contexts/favorites-context"

export default function App() {
  return (
    <FavoritesContextProvider>
      <AuthProvider>
        <NavBar/>
        <Routes>
          <AuthRoute path="/" element={<Home/>} />
          <AuthRoute path="/launches" element={<Launches/>} />
          <AuthRoute path="/launches/:launchId" element={<Launch/>} />
          <AuthRoute path="/launch-pads" element={<LaunchPads/>} />
          <AuthRoute path="/launch-pads/:launchPadId" element={<LaunchPad/>} />
        </Routes>
      </AuthProvider>
    </FavoritesContextProvider>
  );
}
