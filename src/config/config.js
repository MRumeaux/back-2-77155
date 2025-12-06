import 'dotenv/config';

export default {
    port: process.env.PORT || 3000,
    URLMongo: process.env.MONGO_LOCAL_URL,
    secret: process.env.SECRET_SESSION_MONGO,
    passJWT: process.env.JWT_SECRET
}