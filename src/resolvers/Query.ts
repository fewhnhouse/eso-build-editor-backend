import { getUserId } from '../utils'
import { stringArg, idArg, queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user({ id: userId })
      },
    })

    t.list.field('publishedBuilds', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.builds({
          where: { published: true },
        })
      },
    })

    t.list.field('filterBuilds', {
      type: 'Build',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.builds({
          where: {
            AND: [
              {
                OR: [
                  { name_contains: searchString },
                  { race_contains: searchString },
                ],
              },
              { published: true },
            ],
          },
        })
      },
    })

    t.field('build', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.build({ id })
      },
    })
  },
})
