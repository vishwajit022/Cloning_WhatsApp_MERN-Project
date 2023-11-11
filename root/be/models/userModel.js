import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your Email Address"],
        unique: [true, "This Email address is already taken"],
        lowercase: true,
        validate: [validator.isEmail, "Please Provide a valid Email address"],
    },
    picture: {
        type: String,
        default: "https://i.pinimg.com/564x/98/43/c4/9843c460ff72ee89d791bffe667e451c.jpg",
    },
    status: {
        type: String,
        default: "Hey There! I am WhatsApp",
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, "Please Ensure your password length is at least 6 characters long"],
    },
}, {
    collection: "users",
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
})

const userModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);
export default userModel;