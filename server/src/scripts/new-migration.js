// Usage: npm run db:new -- create-products-table
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) {
    console.error('Usage: npm run db:new -- <kebab-case-name>');
    process.exit(1);
}

const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
const file = path.resolve('config/db/migrations', `${stamp}-${name}.js`);

fs.writeFileSync(
    file,
    `const SCHEMA = 'admin';
const table = (tableName) => ({ tableName, schema: SCHEMA });

export async function up(queryInterface, Sequelize) {
  const { DataTypes, literal } = Sequelize;
  // await queryInterface.createTable(table('example'), { ... });
}

export async function down(queryInterface) {
  // await queryInterface.dropTable(table('example'));
}
`,
    { flag: 'wx' }
);
console.log('created', path.relative(process.cwd(), file));