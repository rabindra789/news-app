const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: true,
        },
        interests: [
            {
                type: String,
            },
        ],
        savedArticles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article",
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        // Compare the candidate password with the hashed password
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (err) {
        // If error occurs during comparison, throw it to the caller
        throw new Error("Error comparing passwords");
    }
};


const User = mongoose.model("User", userSchema);
module.exports = User;
