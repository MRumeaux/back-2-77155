import passport from "passport";
import local from "passport-local";
import userModel from "../models/user-model.js";
import { createHash, isValidPassword } from "../utils/index.js";
import jwt from "passport-jwt";

const JWT_SECRET = "secretito123";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy, 
    ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies["authCookie"];
        console.log("Token extraído desde cookie:", token);
    }
    return token;
}

const initializePassport = () => {

    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField:"email"
        },
        async(req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                if ( !first_name || !last_name || !email || !age ){
                    console.log("Ingrese todos los campos necesarios para registrarse.");
                    return done(null, false);
                }
                const userExist = await userModel.findOne({email: username});
                if(userExist){
                    console.log("El correo ya se encuentra registrado.");
                    return done(null, false);
                };
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
                
                const user = await userModel.create(newUser);
                return done(null, user);
                } catch (error) {
                    return done(`Error interno al crear el usuario: ${error}`, false);
                }
            }
        )
    );

    
// login

    passport.use("login", new LocalStrategy({usernameField: "email"}, async(username, password, done) => {
        try {
            if (!username || !password){
                console.log("Ingresar usuario y contraseña para loguearse.");
                return done(null, false);
            }
            const userExist = await userModel.findOne({email: username});
            if (!userExist){
                console.log("No se encontró al usuario solicitado.");
                return done(null, false);
            }
            if (userExist){
                const ValidPassword = isValidPassword(password, userExist.password);
                if(!ValidPassword) {
                    console.log("Error de credenciales");
                    return done(null, false)
                } 
                if(ValidPassword) {
                    const userPayload = {
                        id: userExist._id,
                        first_name: userExist.first_name,
                        last_name: userExist.last_name,
                        age: userExist.age,
                        email: userExist.email
                    }
                }
            } else {
                console.log("Erro de credenciales");
                return done(null, false);
            }
            return done (null, userExist)
        } catch (error) {
            return done(`Error al intentar loguearse: ${error}`, false);
        }
    }))

// jwt strategy

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET
    },
    async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    })

}

export default initializePassport;