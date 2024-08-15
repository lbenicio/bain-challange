import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DistanceQuery } from '../type/distance-query.type';
import { DistanceFiltersDto } from '../dto/distance-filters.dto';

@Injectable()
export class DistanceRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async save(query: DistanceQuery): Promise<DistanceQuery> {
    const newRecord: DistanceQuery = await this.prisma.distanceQuery.create({
      data: query,
    });
    return newRecord;
  }

  async list(params: DistanceFiltersDto): Promise<DistanceQuery[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.distanceQuery.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
