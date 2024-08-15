import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Coordinates } from './type/coordinates.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Point } from './type/point.type';
import { DistanceRepository } from './repository/distance.repository';
import { DistanceFiltersDto } from './dto/distance-filters.dto';
import { DistanceQuery } from './type/distance-query.type';

@Injectable()
export class DistanceService {
  private readonly DISTANCE_API_URL: string = this.configService.get<string>(
    'distance.routerApiUrl',
  );
  private readonly COORDINATES_API_URL: string = this.configService.get<string>(
    'distance.coordinatesApiUrl',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly distanceRepository: DistanceRepository,
  ) {
    this.logger = new Logger(DistanceService.name);
  }

  public async listDistances(
    filters: DistanceFiltersDto,
  ): Promise<DistanceQuery[]> {
    return this.distanceRepository.list(filters);
  }

  public async saveDistance(query: DistanceQuery): Promise<DistanceQuery> {
    return this.distanceRepository.save(query);
  }

  public async getDistance(coordinates: Coordinates): Promise<number> {
    this.logger.debug(`queryDistance(${JSON.stringify(coordinates)})`);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.DISTANCE_API_URL}/route/v1/driving/${coordinates.start.lon},${coordinates.start.lat};${coordinates.end.lon},${coordinates.end.lat}.json?overview=false`,
        ),
      );
      const data = response.data;
      const route = data?.routes?.at(0);
      if (route) {
        return route.distance;
      } else {
        throw new Error('No route found');
      }
    } catch (error: any) {
      this.logger.error(error.message);
      throw error;
    }
  }

  public async getCoordinates(address: string): Promise<Point> {
    this.logger.debug(`queryCoordinates(${address})`);
    const urlEncodedParams = encodeURIComponent(address);

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.COORDINATES_API_URL}/search?q=${urlEncodedParams}&format=jsonv2`,
        ),
      );
      const data = response.data;
      const node = data.at(0);

      if (node) {
        const point: Point = {
          lat: node.lat,
          lon: node.lon,
        };

        return point;
      } else {
        throw new Error('No coordinates found');
      }
    } catch (error: any) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
