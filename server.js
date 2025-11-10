import 'dotenv/config';
import express from "express";
import { initMongoDB } from "./src/config/connect-mongo.js";
import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from 'passport';
import initializePassport from './src/config/passport.config.js';
import userRouter from "./src/routes/user-router.js";
import sessionRouter from "./src/routes/session-router.js";
import viewsRouter from "./src/routes/views-router.js";

const app = express();

//settings
app.set("PORT", 8080);
const secret = "secret123"

initMongoDB()
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/src/public`))

app.engine('handlebars', handlebars.engine());
app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_LOCAL_URL,
        ttl:600
    }),
    secret,
    resave: false,
    saveUninitialized: false
}));
// passport

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//enlace rutas + ejemplos

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use('/users', viewsRouter);


// mid rutas inexistentes
app.use( (req, res, next) => {
    res.status(404).send("Not found");
});

// listeners

app.listen(app.get("PORT"), () => {
    console.log(`Server on port ${app.get("PORT")}`)
})