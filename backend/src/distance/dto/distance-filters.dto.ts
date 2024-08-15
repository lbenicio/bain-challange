import { Prisma } from '@prisma/client';

export type DistanceFiltersDto = {
  skip?: number;
  take?: number;
  cursor?: Prisma.DistanceQueryWhereUniqueInput;
  where?: Prisma.DistanceQueryWhereInput;
  orderBy?: Prisma.DistanceQueryOrderByWithRelationInput;
};
