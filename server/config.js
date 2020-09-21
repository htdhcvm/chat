require('dotenv').config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session);



const configuration = (app) => {
    // connect to database 
    const connectString = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.zrzkm.mongodb.net/<dbname>?retryWrites=true&w=majority`;

    mongoose.connect(connectString, {useNewUrlParser: true,  useUnifiedTopology: true });

    // session storage 
    const store = new MongoDBStore({
        uri: connectString,
        collection: "session_user"
    });
       
    // catch err
    store.on('error', function(error) {
        console.log(error);
    });

    
    // set settings sessions 
    app.use(
        session({
            secret: "secret",
            resave: true,
            saveUninitialized: true,
            store: store,
            cookie: { 
                maxAge: 1000 * 60 * 60 * 24 // 1 hour
            }
        })
    )

    // Cross-origin resource sharing settings 
    app.use(cors({
        origin : "http://127.0.0.1:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials : true
    }))






    // initalize passport
    app.use(passport.initialize());
    // deserialize cookie from the browser
    app.use(passport.session());

    // routes
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);

}

module.exports = configuration;

