import { Sequelize} from "sequelize"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./dbs/db.sqlite",
    logging:false,
});