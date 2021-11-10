import { Pool } from 'pg';
import config from '../common/config.json';

export default class DB {
    private static instance: DB;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            database: config.db.database,
            host: config.db.host,
            user: config.db.username,
            password: config.db.password
        });

        this.createTables();
    }

    public static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }

        return DB.instance;
    }

    public async query(queryString: string, params?: any[]) {
        const client = await this.pool.connect();
        const res = await client.query(queryString, params);
        client.release();
        return res;
    }

    private async createTables() {
        await this.pool.query("CREATE TABLE IF NOT EXISTS category (" +
            "id SERIAL PRIMARY KEY," +
            "name TEXT NOT NULL," +
            "parentId INT REFERENCES category (id)" +
            ");");

        await this.pool.query("CREATE TABLE IF NOT EXISTS product (" +
            "id SERIAL PRIMARY KEY," +
            "name TEXT NOT NULL," +
            "categoryId INT REFERENCES category (id)" +
            ");");
    }
}