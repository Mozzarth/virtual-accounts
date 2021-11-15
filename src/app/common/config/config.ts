
const CONFIG = {
    SECRET_ENCODER: process.env.NODE_APP_ENCODER || "",
    SECRET_SALT: process.env.NODE_APP_SALT || 10,




    // Storage
    DB_HOST: process.env.NODE_DB_HOST || "",
    DB_USER: process.env.NODE_DB_USER || "",
    DB_PASS: process.env.NODE_DB_PASS || "",
    DB_PORT: process.env.NODE_DB_PORT || "",
    DB_DATABASE: process.env.NODE_DB_DATABASE || "",
}


export { CONFIG }