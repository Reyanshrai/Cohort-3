import dotenv from "dotenv"
dotenv.config()

const config = {
    port : process.env.port,
    MONGODB_URI : process.env.MONGODB_URI,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
}

export default config