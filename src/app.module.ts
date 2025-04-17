import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { LawyerModule } from './lawyer/lawyer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): DataSourceOptions => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        ssl:
          config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
      dataSourceFactory: async (
        options: DataSourceOptions,
      ): Promise<DataSource> => {
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
    }),
    LawyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
