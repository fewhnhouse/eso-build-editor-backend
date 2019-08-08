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
  canViewRaid: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const canView = await context.prisma.raid({ id }).canView();
    return canView.find((user: any) => user.id === userId);
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    publishedBuilds: rules.isAuthenticatedUser,
    builds: rules.isAuthenticatedUser,
    build: rules.isAuthenticatedUser,
    raid: rules.canViewRaid,
    raids: rules.isAuthenticatedUser,
  },
  Mutation: {
    createBuild: rules.isAuthenticatedUser,
    createSkillSelections: rules.isAuthenticatedUser,
    createSetSelections: rules.isAuthenticatedUser,
    createRaid: rules.isAuthenticatedUser,
    createRole: rules.isAuthenticatedUser,
    deleteBuild: rules.isBuildOwner,
    publishBuild: rules.isBuildOwner,
  },
});
