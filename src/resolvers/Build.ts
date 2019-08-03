import { prismaObjectType } from 'nexus-prisma'
import { idArg } from 'nexus/dist'

export const Build = prismaObjectType({
  name: 'Build',
  definition(t) {
    t.prismaFields(['*'])
  },
})
