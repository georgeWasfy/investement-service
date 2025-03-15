import { User } from '@base/users/models/user.model';
import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Currency, Status } from '../types';

@Table({ timestamps: true, tableName: 'Transactions' })
export class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.DECIMAL)
  amount: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  currency: Currency;

  @Column(DataType.STRING)
  status: Status;

  @Column(DataType.JSON)
  metadata: object;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;
}
