import express from "express";
import { initMongoDB } from "./src/config/connect-mongo.js";
import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from 'passport';
import initializePassport from './src/config/passport.config.js';
// para deprecar
import viewsRouter from "./src/routes/views.router.js";
// para deprecar
import userRoutes from "./src/routes/users.router.js";
import orderRoutes from "./src/routes/orders.router.js";
import businessRoutes from "./src/routes/business.router.js";
import envs from './src/config/config.js';
import { transporter } from "./src/middlewares/nodemailer.js";

const app = express();

//settings
app.set("PORT", envs.port);

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
        mongoUrl: envs.URLMongo,
        ttl:600
    }),
    secret: envs.secret,
    resave: false,
    saveUninitialized: false
}));
// passport

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//enlace rutas 

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/business", businessRoutes);
// para deprecar
app.use("/views", viewsRouter);

// mail
app.get("/mail", async ( req, res ) => {
    // const {email} = req.body;
    const {email} = req.query;
    const result = await transporter.sendMail({
        from:`Correo de prueba <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: "Correo de prueba",
        html:`<div> 
                <h1>Hola!</h1>
                <p>Hola ${email}, te damos la bienvenida.</p>
            </div>`
    })
    res.send({status:"success", message: "Mail enviado"});
});

// mid rutas inexistentes
app.use( (req, res, next) => {
    res.status(404).send("Not found");
});

// listeners

app.listen(app.get("PORT"), () => {
    console.log(`Server on port ${app.get("PORT")}`)
})