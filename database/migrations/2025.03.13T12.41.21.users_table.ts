import { Migration } from '../../umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedRT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  // Create the trigger function to update updated_at
  await sequelize.query(`
    CREATE OR REPLACE FUNCTION users_update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW."updatedAt" := CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Create the trigger that uses the function
  await sequelize.query(`
    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON "Users"
    FOR EACH ROW EXECUTE PROCEDURE users_update_updated_at();
  `);
};

export const down: Migration = async ({ context: sequelize }) => {
  // Drop the trigger and function first
  await sequelize.query(`
    DROP TRIGGER IF EXISTS set_updated_at ON "Users";
    DROP FUNCTION IF EXISTS users_update_updated_at;
  `);
  await sequelize.getQueryInterface().dropTable('Users');
};
