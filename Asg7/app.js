const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const User = require("./models/User");

const DB = 'mongodb+srv://drishti:bloggingwebsite@cluster0.ads6z.mongodb.net/BloggingWebsite?retryWrites=true&w=majority'

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect(DB, {
    useUnifiedTopology : true,
    useNewUrlParser: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(() => {
    console.log("MongoDB connection failed.");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My server is running on port ${PORT}`);
});

app.use(userRoute);
app.use(adminRoute);