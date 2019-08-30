import { Raid } from './Raid';
import { Query } from './Query'
import { User } from './User'
import { Mutation } from './Mutation'
import { AuthPayload } from './AuthPayload'
import { Build } from './Build'
import { BuildSubscriptionPayload, buildCreateSubscription, buildUpdateSubscription, RaidSubscriptionPayload, raidCreateSubscription, raidUpdateSubscription } from './Subscription'

export const resolvers = {
  Query,
  User,
  Mutation,
  AuthPayload,
  Build,
  Raid,
  BuildSubscriptionPayload,
  RaidSubscriptionPayload,
  buildCreateSubscription,
  buildUpdateSubscription,
  raidCreateSubscription,
  raidUpdateSubscription,

}
