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

    t.list.field('publishedBuilds', {
      type: 'Build',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.builds({
          where: { published: true },
        });
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
        { where, orderBy, first, last, skip, after, before },
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
        { where, orderBy, first, last, skip, after, before },
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

    t.list.field('set', {
      type: 'Set',
      args: { id: idArg(), setId: intArg() },
      resolve: (parent, { id, setId }, ctx) => {
        return ctx.prisma.skill({ id, setId });
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
        { where, orderBy, first, last, skip, after, before },
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

    t.field('skill', {
      type: 'Skill',
      args: { id: idArg(), skillId: intArg() },
      resolve: (parent, { id, skillId }, ctx) => {
        return ctx.prisma.skill({ id, skillId });
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
        { where, orderBy, first, last, skip, after, before },
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

    t.field('mundusStone', {
      type: 'MundusStone',
      args: { name: stringArg() },
      resolve: (parent, { name }, ctx) => {
        return ctx.prisma.mundusStone({ name });
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
        { where, orderBy, first, last, skip, after, before },
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

    t.field('buff', {
      type: 'Buff',
      args: { name: stringArg() },
      resolve: (parent, { name }, ctx) => {
        return ctx.prisma.buff({ name });
      },
    });

    t.list.field('buildsByUser', {
      type: 'Build',
      args: {
        id: idArg(),
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.user({ id }).builds();
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
        { where, orderBy, first, last, skip, after, before },
        ctx
      ) => {
        return ctx.prisma.builds({
          where: { ...where /*, published: true*/ },
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

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.users();
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
            canEdit_some: { id: userId },
            canView_some: { id: userId } /*, published: true*/,
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
