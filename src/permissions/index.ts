import { rule, shield } from 'graphql-shield';
import { getUserId } from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  canViewBuild: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const { published } = await context.prisma.build({ id })
    const owner = await context.prisma.build({ id }).owner();
    if (published) {
      return true;
    } else {
      return userId === owner.id;
    }
  }),
  canViewRaid: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const { published } = await context.prisma.raid({ id })
    const owner = await context.prisma.raid({ id }).owner();
    if (published) {
      return true;
    } else {
      // const canView = await context.prisma.raid({ id }).canView();
      return /*canView.find((user: any) => user.id === userId) ||*/ userId === owner.id;
    }
  }),
  canDeleteBuild: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.build({ id }).owner();
    return userId === owner.id;
  }),
  canDeleteRaid: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.raid({ id }).owner();
    return userId === owner.id;
  }),
  canUpdateRaid: rule()(async (parent, { where }, context) => {
    const userId = getUserId(context);
    const canEdit = await context.prisma.raid({ id: where.id }).canEdit();
    const owner = await context.prisma.raid({ id: where.id }).owner();
    return canEdit.find((user: any) => user.id === userId) || userId === owner.id;
  }),

  canUpdateBuild: rule()(async (parent, { where }, context) => {
    const userId = getUserId(context);
    const owner = await context.prisma.build({ id: where.id }).owner();
    return userId === owner.id;
  }),

};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser,
    builds: rules.isAuthenticatedUser,
    ownBuilds: rules.isAuthenticatedUser,
    build: rules.canViewBuild,
    raid: rules.canViewRaid,
    raids: rules.isAuthenticatedUser,
    ownRaids: rules.isAuthenticatedUser
  },
  Mutation: {
    createRaid: rules.isAuthenticatedUser,
    updateRaid: rules.canUpdateRaid,
    deleteRaid: rules.canDeleteRaid,
    createBuild: rules.isAuthenticatedUser,
    updateBuild: rules.canUpdateBuild,
    deleteBuild: rules.canDeleteBuild,
    createSkillSelections: rules.isAuthenticatedUser,
    createSetSelections: rules.isAuthenticatedUser,
  },
  Subscription: {
    buildUpdateSubscription: rules.canViewBuild,
    raidUpdateSubscription: rules.canViewRaid,
    buildCreateSubscription: rules.isAuthenticatedUser,
    raidCreateSubscription: rules.isAuthenticatedUser
  }
});
