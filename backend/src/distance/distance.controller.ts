import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { Coordinates } from './type/coordinates.type';
import { Point } from './type/point.type';
import { DistanceRequestDto } from './dto/distance-request.dto';
import { TimeUtils } from 'src/utils/time.utils';
import { ConfigService } from '@nestjs/config';
import { DistanceQuery } from './type/distance-query.type';
import { DistanceFiltersDto } from './dto/distance-filters.dto';

@Controller('/distance')
export class DistanceController {
  private readonly COORDINATE_SERVICE_SLEEP_TIME: number =
    this.configService.get<number>(`app.coordinateServiceSleepTime`);

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly distanceService: DistanceService,
  ) {
    this.logger = new Logger(DistanceController.name);
  }

  @Post()
  async getDistance(@Body() body: DistanceRequestDto): Promise<number> {
    this.logger.debug(`POST /distance}`);
    this.logger.debug(`PARAMS: ${JSON.stringify(body)}`);

    const start: Point = await this.distanceService.getCoordinates(body.start);
    // sleep 5 seconds between requests
    await TimeUtils.sleep(this.COORDINATE_SERVICE_SLEEP_TIME);
    const end: Point = await this.distanceService.getCoordinates(body.end);

    const coordinates: Coordinates = { start, end };
    const distance: number =
      await this.distanceService.getDistance(coordinates);

    const query: DistanceQuery = {
      distance: distance,
      to: body.end,
      from: body.start,
    };

    await this.distanceService.saveDistance(query);

    return distance;
  }

  @Get()
  async listDistances(
    @Query() filters: DistanceFiltersDto,
  ): Promise<DistanceQuery[]> {
    const distances: DistanceQuery[] =
      await this.distanceService.listDistances(filters);

    return distances;
  }
}
