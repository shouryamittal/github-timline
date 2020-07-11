import {Sequelize, sequelize} from '../db/connection';
import hashPassword from '../service/hashPassword';
const Model = Sequelize.Model;

/*creating model */
class User extends Model {}

/**Defining model props */
User.init({
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'User',
    timeStamps: true
})

User.beforeCreate(user => {
    hashPassword(user.password)
        .then((hashedPassword) => {
            user.password = hashedPassword;
        })
        .catch((error) => {
            user.password = null;
        });
})

User.sync({
    force: true
})
.then(() => {
    console.log('User table created ..!!');
})
.catch((error) => {
    console.log('Error: DB table User cannot be created ..!!');
    console.log(error);
})

export default User;