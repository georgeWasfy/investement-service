import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import { User } from './users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/model/transaction.model';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import tokenConfig from 'config/token.config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, tokenConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DATABASE.DRIVER'),
        replication: {
          read: [
            {
              host: configService.get('DATABASE.HOST_READ'),
              port: configService.get('DATABASE.PORT'),
              username: configService.get('DATABASE.USER'),
              password: configService.get('DATABASE.PASS'),
            },
          ],
          write: {
            host: configService.get('DATABASE.HOST_WRITE'),
            port: configService.get('DATABASE.PORT'),
            username: configService.get('DATABASE.USER'),
            password: configService.get('DATABASE.PASS'),
          },
        },
        database: configService.get('DATABASE.NAME'),
        models: [User, Transaction],
        logging: false,
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: true,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    UserModule,
    AuthModule,
    TransactionModule,
    PaymentGatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
