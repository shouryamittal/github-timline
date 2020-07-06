import Sequelize from 'sequelize';

const sequelize = new Sequelize('gitTimeline', 'root', '', {   
    /*this will be changes in production */
    host: 'localhost',
    port: '3306',
    pool: {
        max: 5
    },
    retry: 3000,
    dialect: 'mysql'
});

sequelize
    .authenticate()
        .then(() => {
            console.log(`Database Connection Setup Successfully ..!!`);
        })
        .catch((error) => {
            console.log(`Error: Could not connect to the database ..!! ${error}`);
        })

export {Sequelize, sequelize}
