import { getUserId } from '../utils';
import { stringArg, idArg, queryType, arg, intArg, objectType } from 'nexus';

const Data = objectType({
  name: 'Data',
  definition(t) {
    t.int('index');
    t.int('skillId');
  },
});
export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.user({ id: userId });
      },
    });

    t.list.field('modifications', {
      type: 'Modification',
      args: {
        where: arg({ type: 'ModificationWhereInput' }),
        orderBy: arg({ type: 'ModificationOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before }: any,
        ctx
      ) => {
        return ctx.prisma.modifications({
          where,
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.users();
      },
    });

    t.field('set', {
      type: 'Set',
      args: {
        id: idArg(),
        setId: intArg()
      },
      resolve: (parent, { id, setId }, ctx) => {
        return ctx.prisma.set({ id, setId });
      },

    })

    t.list.field('sets', {
      type: 'Set',
      args: {
        where: arg({ type: 'SetWhereInput' }),
        orderBy: arg({ type: 'SetOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before }: any,
        ctx
      ) => {
        return ctx.prisma.sets({
          where,
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.field('skill', {
      type: 'Skill',
      args: { id: idArg(), skillId: intArg() },
      resolve: (parent, { id, skillId }, ctx) => {
        return ctx.prisma.skill({ id, skillId });
      },
    });

    t.list.field('skills', {
      type: 'Skill',
      args: {
        where: arg({ type: 'SkillWhereInput' }),
        orderBy: arg({ type: 'SkillOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before }: any,
        ctx
      ) => {
        return ctx.prisma.skills({
          where,
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.list.field('skillLine', {
      type: 'Skill',
      args: { skillline: intArg() },
      resolve: (
        parent,
        { skillline },
        ctx
      ) => {
        return ctx.prisma.skills({
          where: { skillline },
        });
      },
    })

    t.field('mundusStone', {
      type: 'MundusStone',
      args: { name: stringArg(), id: idArg() },
      resolve: (parent, { name, id }, ctx) => {
        return ctx.prisma.mundusStone({ name, id });
      },
    });

    t.list.field('mundusStones', {
      type: 'MundusStone',
      args: {
        where: arg({ type: 'MundusStoneWhereInput' }),
        orderBy: arg({ type: 'MundusStoneOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before }: any,
        ctx
      ) => {
        return ctx.prisma.mundusStones({
          where,
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.field('buff', {
      type: 'Buff',
      args: { name: stringArg(), id: idArg() },
      resolve: (parent, { name, id }, ctx) => {
        return ctx.prisma.buff({ name, id });
      },
    });

    t.list.field('buffs', {
      type: 'Buff',
      args: {
        where: arg({ type: 'BuffWhereInput' }),
        orderBy: arg({ type: 'BuffOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before }: any,
        ctx
      ) => {
        return ctx.prisma.buffs({
          where,
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.field('build', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.build({ id });
      },
    });

    t.list.field('builds', {
      type: 'Build',
      args: {
        where: arg({ type: 'BuildWhereInput' }),
        orderBy: arg({ type: 'BuildOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before }: any,
        ctx
      ) => {
        const userId = getUserId(ctx)
        return ctx.prisma.builds({
          where: { ...where, OR: [{ published: true }, { owner: { id: userId } }] },
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.list.field('ownBuilds', {
      type: 'Build',
      args: {
        where: arg({ type: 'BuildWhereInput' }),
        orderBy: arg({ type: 'BuildOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before },
        ctx
      ) => {
        const userId = getUserId(ctx)
        return ctx.prisma.builds({
          where: { ...where, owner: { id: userId } },
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });


    t.field('raid', {
      type: 'Raid',
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.raid({ id });
      },
    });

    t.list.field('raids', {
      type: 'Raid',
      args: {
        where: arg({ type: 'RaidWhereInput' }),
        orderBy: arg({ type: 'RaidOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before },
        ctx
      ) => {
        const userId = getUserId(ctx);

        return ctx.prisma.raids({
          where: {
            ...where,
            OR: [{ published: true }, { owner: { id: userId } }]
          },
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });

    t.list.field('ownRaids', {
      type: 'Raid',
      args: {
        where: arg({ type: 'RaidWhereInput' }),
        orderBy: arg({ type: 'RaidOrderByInput' }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        after: stringArg(),
        before: stringArg(),
      },
      resolve: (
        parent,
        { where, orderBy, first, last, skip, after, before },
        ctx
      ) => {
        const userId = getUserId(ctx);

        return ctx.prisma.raids({
          where: {
            ...where,
            owner: { id: userId }
          },
          orderBy,
          first,
          last,
          skip,
          after,
          before,
        });
      },
    });
  },


});
