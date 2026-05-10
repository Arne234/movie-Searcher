import mongoose from "mongoose";


const MovieSchema = new mongoose.Schema({
    
    username: { type: String,
                required: true},
        
    Title: {    type: String,
                required: true},

    imdbID: {   type: String,
                required: true},

    Poster: {   type: String,
                required: true},

    Year: {     type: String,
                required: false},

    Plot: {     type: String,
                required: false},

    Ratings: {  type: Array,
                required: false},
})

const movies = mongoose.model("movies", MovieSchema);

export default movies