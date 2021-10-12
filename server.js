/**
 * @packages this are needed routes for the our API
 * @express this api is based on express
 */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cors = require("cors");

/**
 * @user this are the user routes imported here
 */
const bookRoute = require("./routes/books");

/**
 * @AppConfig this is configuration of our api app 
 * */
const app = express();                  // instanciating express() in app variable
dotenv.config();                        // to use .env variables
const Port = process.env.Port || 4000;

/**
 * @middalwares this is for error handaling and security of our app
 */
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.use("/books", bookRoute);

/**
 * @Database this is connecting to the mongodb database 
 */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then ( () => console.log("MongoDB Connected"))
.catch ( (err) => console.log(err)); 


/**
 * @defualt endpoint
 */
app.get("/", (req, res) => {
    res.status(200).json("Hello From Books API Server");
});

/**
 * @listen listening the server on your port 
 */
app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})