import { rule, shield } from 'graphql-shield';
import { getUserId } from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isBuildOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.build({ id }).owner();
    return userId === owner.id;
  }),
  isRaidOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.raid({ id }).owner();
    console.log(owner, userId);
    return userId === owner.id;
  }),
  canUpdateRaid: rule()(async (parent, { where }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.raid({ id: where.id }).owner();
    console.log(owner, userId);
    return userId === owner.id;
  }),

  canUpdateBuild: rule()(async (parent, { where }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.build({ id: where.id }).owner();
    console.log(owner, userId);
    return userId === owner.id;
  }),

  canViewRaid: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const canView = await context.prisma.raid({ id }).canView();
    return canView.find((user: any) => user.id === userId);
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser,
    builds: rules.isAuthenticatedUser,
    build: rules.isAuthenticatedUser,
    raid: rules.isAuthenticatedUser,
    raids: rules.isAuthenticatedUser,
  },
  Mutation: {
    createRaid: rules.isAuthenticatedUser,
    updateRaid: rules.canUpdateRaid,
    deleteRaid: rules.isRaidOwner,
    createBuild: rules.isAuthenticatedUser,
    updateBuild: rules.canUpdateBuild,
    deleteBuild: rules.isBuildOwner,
    createSkillSelections: rules.isAuthenticatedUser,
    createSetSelections: rules.isAuthenticatedUser,
    publishBuild: rules.isBuildOwner,
  },
});
