import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

const client = new PrismaClient();

const extendedClient = client.$extends(
  createSoftDeleteExtension({
    models: {},
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date(Date.now());
        return null;
      },
    },
  }),
);

export default extendedClient;
