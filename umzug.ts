import { Sequelize } from 'sequelize';
import { dbConfig } from './config/database.config';
import * as fs from 'fs';
import * as path from 'path';
import { Umzug } from 'umzug/lib/umzug';
import { SequelizeStorage } from 'umzug/lib/storage/sequelize';
const db = dbConfig[process.env.DB_CONNECTION ?? 'main'];

const sequelize = new Sequelize(db.name, db.user, db.pass, {
    dialect: db.driver,
    replication: {
        read: [
            {
                host: db.hostRead,
                port: db.port,
                username: db.user,
                password: db.pass,
            },
        ],
        write: {
            host: db.hostWrite,
            port: db.port,
            username: db.user,
            password: db.pass,
        },
    },
});
const pathToMigrationsFolder = path.join(__dirname, 'database', 'migrations');

export const migrator = new Umzug({
    migrations: {
        glob: ['database/migrations/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize, modelName: 'migration_meta' }),
    logger: console,
    create: {
        folder: pathToMigrationsFolder,
        template: (filepath) => [
            [
                filepath,
                fs
                    .readFileSync(
                        path.join(
                            __dirname,
                            'database',
                            'template',
                            'sample-migration.ts',
                        ),
                    )
                    .toString(),
            ],
        ],
    },
});

export type Migration = typeof migrator._types.migration;

const pathToSeedingFolder = path.join(__dirname, 'database', 'seeders');

export const seeder = new Umzug({
    migrations: {
        glob: ['database/seeders/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize, modelName: 'seeder_meta' }),
    logger: console,
    create: {
        folder: pathToSeedingFolder,
        template: (filepath) => [
            [
                filepath,
                fs
                    .readFileSync(
                        path.join(
                            __dirname,
                            'database',
                            'template',
                            'sample-seed.ts',
                        ),
                    )
                    .toString(),
            ],
        ],
    },
});

export type Seeder = typeof seeder._types.migration;