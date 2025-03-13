import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'users' })


export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  hashedRT: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
