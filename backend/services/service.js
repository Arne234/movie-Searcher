import mongoose from "mongoose";
import movies from "../models/movieModel.js";
import User from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ValidationError from "../../src/Movies/errorClass/validationError.js";


export const postUser = async (Username, Password) => {

    if (!Username?.trim() || !Password?.trim()) {
        throw new ValidationError(
            "Length cant be 0",
            "User entered a username or password with a character length of 0"
        )
    }
    
    const exists = await User.findOne({username: Username });
    if (exists) {
        throw new ValidationError(
            "Username already exists",
            "User entered a username while registrating that is already used"
        )
    }
    
    const hashed = await bcrypt.hash(Password, 10)
    
    const user = {
        username: Username,
        password: hashed
    }
    
    return await User.create(user);
}



export const checkUser = async (Username, Password) => {

    const user = await User.findOne({   username: Username});

    if (!user) {
        throw new ValidationError(
            "Wrong username or password",
            "user entered a username or password while logging in that doesnt exist"
        )
    }

    const isValid = await bcrypt.compare(Password, user.password);

    if (!isValid) {
        throw new ValidationError(
            "Wrong username or password",
            "user entered a username or password while logging in that doesnt exist"
        )
    }

    const token = jwt.sign(
        {   userId: user._id,
            username: user.username
        },
        process.env.TOKEN,
        {expiresIn: "1h"}
    )

    return token
}


export const fetchMovie = async (search) => {

    const result = await fetch(`https://www.omdbapi.com/?apikey=${process.env.Api_Key}&s=${search}`);
    const movies = await result.json();

    return movies
}


export const fetchMovieDetail = async (id) => {

    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.Api_Key}`)
    const data = await response.json()

    return data
}


export const getFavoriteMovies = async (Username) => {

    const favoriteMovies = await movies.find({username: Username});

    return favoriteMovies
}


export const postFavoriteMovie = async (id, Username) => {

    const exists = await movies.findOne({   username: Username,
                                            imdbID: id});
    if (exists) {
        throw new ValidationError(
            "Movie already exists",
            "user wanted to favoritize a movie that was already favoritized"
        )
    }

    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.Api_Key}`)
            
    const data = await response.json();


    await movies.create({   username: Username,
                            Title: data.Title,
                            imdbID: id,
                            Poster: data.Poster,
                            Year: data.Year,
                            Plot: data.Plot
    })
}


export const deleteFavoriteMovie = async (id, Username) => {

    await movies.deleteMany({   username: Username,
                                imdbID: id});
}