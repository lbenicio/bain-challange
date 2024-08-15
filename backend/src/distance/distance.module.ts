import { Logger, Module } from '@nestjs/common';
import { DistanceController } from './distance.controller';
import { DistanceService } from './distance.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import distanceConfig from 'src/config/distance.config';
import { DistanceRepository } from './repository/distance.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [distanceConfig],
    }),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [DistanceController],
  providers: [DistanceRepository, DistanceService, Logger],
})
export class DistanceModule {}
