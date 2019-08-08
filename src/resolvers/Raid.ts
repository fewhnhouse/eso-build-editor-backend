import { prismaObjectType } from 'nexus-prisma';

export const Raid = prismaObjectType({
  name: 'Raid',
  definition(t) {
    t.prismaFields(['*']);
  },
});
