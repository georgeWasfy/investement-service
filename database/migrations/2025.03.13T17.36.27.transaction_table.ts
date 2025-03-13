import { DataTypes } from 'sequelize';
import { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    currency: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    metadata: {
      type: DataTypes.JSON,
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
    CREATE OR REPLACE FUNCTION transactions_update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Create the trigger that uses the function
  await sequelize.query(`
    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON "Transactions"
    FOR EACH ROW EXECUTE PROCEDURE transactions_update_updated_at();
  `);
};

export const down: Migration = async ({ context: sequelize }) => {
  // Drop the trigger and function first
  await sequelize.query(`
    DROP TRIGGER IF EXISTS set_updated_at ON "Transactions";
    DROP FUNCTION IF EXISTS transactions_update_updated_at;
  `);
  await sequelize.getQueryInterface().dropTable('Transactions');
};
