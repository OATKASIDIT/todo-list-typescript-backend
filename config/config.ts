import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DB_NAME || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "";
const dialect = "postgres"; // one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});

export default sequelize;