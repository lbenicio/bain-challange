import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistanceModule } from 'src/distance/distance.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Module({
  imports: [
    DistanceModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
