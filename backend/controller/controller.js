
import {    postUser,
            checkUser,
            fetchMovie,
            fetchMovieDetail,
            getFavoriteMovies,
            postFavoriteMovie,
            deleteFavoriteMovie} from "../services/service.js";

export const postUserController = async (req, res, next) => {

    try {
        const {Username, Password} = req.body;

        await postUser(Username, Password)

        res.status(201).json({message: "User created succesfully"})

    }
    catch(err) {
        next(err)
    }
}

export const checkUserController = async (req, res,next) => {

    try {
        const {Username, Password} = req.body;

        const token = await checkUser(Username, Password)

        res.status(200).json({token})
    }

    catch(err) {
        next(err)
    }    
}

export const fetchMovieController = async (req, res, next) => {

    try {
        const search = req.query.search;
            
        const movies = await fetchMovie(search)

        res.status(200).json(movies)
    }

    catch(err) {
        next(err)
    }

}

export const fetchMovieDetailController = async (req, res, next) => {

    try {
        const {id} = req.params;

        const data = await fetchMovieDetail(id);

        res.status(200).json(data)
    }

    catch(err) {
        next(err)
    }
}

export const getFavoriteMoviesController = async (req, res, next) => {

    try {
        const Username = req.user.username;
        
        const favoriteMovies = await getFavoriteMovies(Username)

        return res.status(200).json(favoriteMovies)
    }

    catch(err) {
        next(err)
    }
}

export const postFavoriteMovieController = async (req, res, next) => {

    try {
        const {id} = req.params;
        const Username = req.user.username;

        await postFavoriteMovie(id, Username)

        res.status(201).json({movie: "saved successfully"});
    }

    catch(err) {
        next(err)
    }
}

export const deleteFavoriteMovieController = async (req, res, next) => {
  
    try {
        const {id} = req.params;
        const Username = req.user.username;

        await deleteFavoriteMovie(id, Username)

        res.status(200).json({message: "Movie succesfully deleted"})        
    }

    catch(err) {
        next(err)
    }
}