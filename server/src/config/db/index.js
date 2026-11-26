import { Sequelize } from 'sequelize';
import configs from './config.js';

const config = configs[process.env.NODE_ENV || 'development'];

// Primary connection: all writes
export const db = new Sequelize(config.url, config);

// Read connection: reports and dashboards. Falls back to the primary if not set,
// so switching to a read replica later needs only an env change.
export const readDb = config.readUrl
    ? new Sequelize(config.readUrl, {
        ...config,
        pool: { ...config.pool, max: 5 },
        dialectOptions: { ...config.dialectOptions, statement_timeout: 10000 },
    })
    : db;

export async function connectDb() {
    await db.authenticate();
    if (readDb !== db) await readDb.authenticate();
}

export async function closeDb() {
    if (readDb !== db) await readDb.close();
    await db.close();
}