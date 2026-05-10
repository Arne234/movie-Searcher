import {Routes, Route} from "react-router-dom"
import {FavoritesProvider} from "./context/favoritesProvider.jsx"
import { UseMoviesProvider } from "./context/MoviesProvider.jsx"

import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx"
import StartMovieApp from "./pages/showMovies.jsx"
import ShowDetails from "./pages/showDetailsPage.jsx"
import ShowFavoriteMovies from "./pages/showFavoriteMovies.jsx"

function App() {

    return( 
        <UseMoviesProvider>
            <FavoritesProvider>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/movies" element={<StartMovieApp />} />
                    <Route path="/movie/:id" element={<ShowDetails />} />
                    <Route path="/favorites" element={<ShowFavoriteMovies />} />
                </Routes>
           </FavoritesProvider>
        </UseMoviesProvider>
    )
}

export default App
