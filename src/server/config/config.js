const env = process.env.NODE_ENV || 'development';
let config = {
    development:{
        DB_URL : "mongodb://localhost:27017/gt",
        PORT : 3000,
        HASH_SALT_COST : 10,
    }
}
const envConfig = config[env];
console.log( config[env])
Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
});
console.log(process.env.PORT);
