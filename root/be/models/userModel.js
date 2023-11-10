import mongoose from "mongoose";
import { validator } from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: "String",
        required: [true, "Please provide your name"],
    },
    email: {
        type: "String",
        requied: [true, "PLease provide your Email Address"],
        unique: [true, "This Email address is already taken"],
        lowercase: true,
        validate: [validator.isEmail, "PLease Provide a valid Email address"],
    },
    picture: {
        type: "String",
        default: "https://i.pinimg.com/564x/98/43/c4/9843c460ff72ee89d791bffe667e451c.jpg",
    },
    status: {
        type: "String",
        default: "Hey There! I am WhatsApp",
    },
    password: {
        type: "String",
        requied: [true, "Please provide your password"],
        minLength: [6, "Please Ensure your password lenght is atleast 6 charachets long"],
    },
}, {
    collection: "users",
    timestamps: true,

});

const userModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);
export default userModel;