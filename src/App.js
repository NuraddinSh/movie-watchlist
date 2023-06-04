import React from "react";
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Movielist from "./Components/Movielist";
import Watchlist from "./Components/Watchlist";
import MovieDetails from "./Components/MovieDetails";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Movielist />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path={"/watchlist/:movieId"} element={<MovieDetails />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}



