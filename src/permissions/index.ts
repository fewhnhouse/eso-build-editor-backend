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
    builds: rules.isAuthenticatedUser,
    build: rules.isAuthenticatedUser,
    raid: rules.isAuthenticatedUser,
    raids: rules.isAuthenticatedUser,
  },
  Mutation: {
    createRaid: rules.isAuthenticatedUser,
    updateRaid: rules.isRaidOwner,
    deleteRaid: rules.isRaidOwner,
    createBuild: rules.isAuthenticatedUser,
    updateBuild: rules.isBuildOwner,
    deleteBuild: rules.isBuildOwner,
    createSkillSelections: rules.isAuthenticatedUser,
    createSetSelections: rules.isAuthenticatedUser,
    createRole: rules.isAuthenticatedUser,
    updateRole: rules.isAuthenticatedUser,
    publishBuild: rules.isBuildOwner,
  },
});
