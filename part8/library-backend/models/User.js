import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        minlength: 3,
        unique: true
    },
    favouriteGenre: {
        type: String,
        required: true
    }

})

export default mongoose.model('User', schema);