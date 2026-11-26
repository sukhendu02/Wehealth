import dotenv from 'dotenv'
dotenv.config()

// Single source of truth: used by the app (index.js) and by sequelize-cli.
const config = {
    url: process.env.DATABASE_URL,
    readUrl: process.env.DATABASE_READ_URL, // optional: read-only user / read replica
    dialect: 'postgres',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    timezone: '+00:00',
    pool: { max: Number(process.env.DB_POOL_MAX) || 10, min: 0, idle: 10000, acquire: 30000 },
    dialectOptions: {
        statement_timeout: 30000, // kill any query running longer than 30s
        ...(process.env.DB_SSL === 'true' && { ssl: { require: true, rejectUnauthorized: false } }),
    },
    // Own history table so it never clashes with the existing system's migrations
    migrationStorageTableName: 'admin_migrations',
};

export default { development: config, staging: config, production: config };