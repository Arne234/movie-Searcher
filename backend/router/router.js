import express from "express";

const Router = express.Router();

import asyncHandler from "../middleware/asnycHandler.js";
import { auth } from "../middleware/auth.js";

import {    postUserController,
            checkUserController,
            fetchMovieController,
            fetchMovieDetailController,
            getFavoriteMoviesController, 
            postFavoriteMovieController,
            deleteFavoriteMovieController} from "../controller/controller.js";

Router.post("/register", asyncHandler(postUserController));
Router.post("/login", asyncHandler(checkUserController));

Router.get("/", asyncHandler(fetchMovieController));

Router.get("/favorites", auth, asyncHandler(getFavoriteMoviesController));

Router.get("/:id", asyncHandler(fetchMovieDetailController));

Router.post("/favorites/:id", auth, asyncHandler(postFavoriteMovieController));
Router.delete("/favorites/:id", auth, asyncHandler(deleteFavoriteMovieController));

export default Router