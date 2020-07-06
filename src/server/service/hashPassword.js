import bcrypt from 'bcrypt';
const hashSalt = process.env.HASH_SALT_COST;

export default (password) => {
    return bcrypt.hash(password, hashSalt);
}