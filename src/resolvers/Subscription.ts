import { subscriptionField, objectType, idArg } from "nexus/dist";
import { Build } from "./Build";
import { Raid } from "./Raid";
export const BuildSubscriptionPayload = objectType({
    name: "BuildSubscriptionPayload",
    definition(t) {
        t.field("node", {
            type: Build,
            nullable: true
        });
        t.list.string("updatedFields", { nullable: true });
    }
});

export const RaidSubscriptionPayload = objectType({
    name: "RaidSubscriptionPayload",
    definition(t) {
        t.field("node", {
            type: Raid,
            nullable: true
        });
        t.list.string("updatedFields", { nullable: true });
    }
});

export const buildCreateSubscription = subscriptionField("buildCreateSubscription", {
    type: BuildSubscriptionPayload,
    subscribe: (root, args, context) => {
        return context.prisma.$subscribe.build({ mutation_in: ["CREATED"] }) as any;
    },
    resolve: payload => {
        return payload;
    }
});

export const buildUpdateSubscription = subscriptionField("buildUpdateSubscription", {
    type: BuildSubscriptionPayload,
    args: {
        id: idArg()
    },
    subscribe: (root, { id }, context) => {
        return context.prisma.$subscribe.build({ node: { id }, mutation_in: ["UPDATED"] }) as any;
    },
    resolve: payload => {
        return payload;
    }
});

export const raidCreateSubscription = subscriptionField("raidCreateSubscription", {
    type: RaidSubscriptionPayload,
    subscribe: (root, args, context) => {
        return context.prisma.$subscribe.raid({ mutation_in: ["CREATED"] }) as any;
    },
    resolve: payload => {
        return payload;
    }
});

export const raidUpdateSubscription = subscriptionField("raidUpdateSubscription", {
    type: RaidSubscriptionPayload,
    args: {
        id: idArg()
    },
    subscribe: (root, { id }, context) => {
        console.log(root, context)
        return context.prisma.$subscribe.raid({ node: { id }, mutation_in: ["UPDATED"] }) as any;
    },
    resolve: payload => {
        return payload;
    }
});

