import { SkillSelectionUpdateDataInput } from './../generated/nexus-prisma/nexus-prisma';
import { stringArg, idArg, mutationType, arg, intArg } from 'nexus';
import { hash, compare } from 'bcryptjs';
import { APP_SECRET, getUserId } from '../utils';
import { sign } from 'jsonwebtoken';
import { setApiKey, send } from '@sendgrid/mail';
const crypto = require('crypto-random-string');

export const Mutation = mutationType({
  definition(t) {
    /**
     * AUTH
     */
    t.field('confirmSignup', {
      type: 'AuthPayload',
      args: {
        token: stringArg(),
      },
      resolve: async (parent, { token }, ctx) => {
        // get user by verificationToken
        const verificationUser = await ctx.prisma
          .verification({ token })
          .user();
        if (!verificationUser) {
          return new Error('Invalid token.');
        }
        const user = await ctx.prisma.updateUser({
          data: { verified: true },
          where: { id: verificationUser.id },
        });
        if (user) {
          return {
            token: sign({ userId: user.id }, APP_SECRET),
            user,
          };
        } else {
          return new Error('Invalid token.');
        }
      },
    });
    t.field('signup', {
      type: 'User',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.prisma.createUser({
          name,
          email,
          password: hashedPassword,
          verified: false,
        });

        const token = crypto({ length: 32 });
        await ctx.prisma.createVerification({
          token,
          user: { connect: { id: user.id } },
        });
        setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: email,
          from: 'noreply@buildeditor.com',
          subject: 'Verification Email ESO Build Editor',
          text:
            'Copy this link to your browser to verify your account:http://localhost:3000/verify/' +
            token,
          html: `<strong>Click this link to verify your account:<a href="http://localhost:3000/verify/${token}">Link</a> </strong>`,
        };
        await send(msg);

        return user;
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user({ email });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    /**
     * BUILDS
     */

    t.field('draftBuild', {
      type: 'Build',
      args: {
        name: stringArg(),
        race: stringArg(),
        esoClass: stringArg(),
        ultimateOneId: intArg(),
        ultimateTwoId: intArg(),
        frontBarIds: intArg({ list: true }),
        backBarIds: intArg({ list: true }),
        bigPieceIds: intArg({ list: true }),
      },
      resolve: (parent, { name, race, esoClass }, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.createBuild({
          name,
          race,
          esoClass,
        });
      },
    });

    t.field('createBuild', {
      type: 'Build',
      args: {
        data: arg({ type: 'BuildCreateInput' }),
      },
      resolve: async (parent, { data }, ctx) => {
        const userId = getUserId(ctx);
        return await ctx.prisma.createBuild({
          ...data,
          owner: { connect: { id: userId } },
        });
      },
    });
    t.field('deleteBuild', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.deleteBuild({ id });
      },
    });
    t.field('updateBuild', {
      type: 'Build',
      args: {
        where: arg({ type: 'BuildWhereUniqueInput' }),
        data: arg({ type: 'BuildUpdateInput' }),
      },
      resolve: async (parent, { where, data }, ctx) => {
        return await ctx.prisma.updateBuild({ where, data });
      },
    });

    t.field('publishBuild', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: async (parent, { id }, ctx) => {
        return await ctx.prisma.updateBuild({
          where: { id },
          data: { published: true },
        });
      },
    });

    /**
     * SKILLSELECTIONS
     */
    t.list.field('createSkillSelections', {
      type: 'SkillSelection',
      args: {
        indices: arg({ list: true, type: 'Int' }),
        skillIds: arg({ list: true, type: 'Int' }),
      },
      resolve: async (parent, { indices, skillIds }, ctx) => {
        return await indices.map(
          async (index: number) =>
            await ctx.prisma.createSkillSelection({
              index,
              skill:
                skillIds && skillIds[index] !== 0
                  ? { connect: { skillId: skillIds[index] } }
                  : undefined,
            })
        );
      },
    });

    t.field('updateSkillSelection', {
      type: 'SkillSelection',
      args: {
        where: arg({ type: 'SkillSelectionWhereUniqueInput' }),
        data: arg({ type: 'SkillSelectionUpdateInput' }),
      },
      resolve: async (parent, { where, data }, ctx) => {
        return await ctx.prisma.updateSkillSelection({
          where,
          data,
        });
      },
    });
    /**
     * SET SELECTIONS
     */
    t.list.field('createSetSelections', {
      type: 'SetSelection',
      args: {
        slots: arg({ list: true, type: 'String' }),
        types: arg({ list: true, type: 'String' }),
        weaponTypes: arg({ list: true, type: 'String' }),
        traitDescriptions: arg({ list: true, type: 'String' }),
        glyphDescriptions: arg({ list: true, type: 'String' }),
        setIds: arg({ list: true, type: 'Int' }),
      },
      resolve: async (
        parent,
        {
          slots,
          traitDescriptions,
          glyphDescriptions,
          types,
          weaponTypes,
          setIds,
        },
        ctx
      ) => {
        return await slots.map(
          async (slot: string, index: number) =>
            await ctx.prisma.createSetSelection({
              slot,
              type: types && types[index] ? types[index] : '',
              weaponType:
                weaponTypes && weaponTypes[index] ? weaponTypes[index] : '',
              trait: traitDescriptions[index]
                ? { connect: { description: traitDescriptions[index] } }
                : undefined,
              glyph: glyphDescriptions[index]
                ? { connect: { description: glyphDescriptions[index] } }
                : undefined,
              selectedSet: setIds[index]
                ? { connect: { setId: setIds[index] } }
                : undefined,
            })
        );
      },
    });
    t.field('updateSetSelection', {
      type: 'SetSelection',
      args: {
        where: arg({ type: 'SetSelectionWhereUniqueInput' }),
        data: arg({ type: 'SetSelectionUpdateInput' }),
      },
      resolve: async (parent, { where, data }, ctx) => {
        return await ctx.prisma.updateSetSelection({
          data,
          where,
        });
      },
    });
    /**
     * RAIDS
     */
    t.field('createRaid', {
      type: 'Raid',
      args: {
        data: arg({ type: 'RaidCreateInput' }),
      },
      resolve: async (parent, { data }, ctx) => {
        const userId = getUserId(ctx);
        return await ctx.prisma.createRaid({
          ...data,
          owner: { connect: { id: userId } },
        });
      },
    });

    t.field('updateRaid', {
      type: 'Raid',
      args: {
        where: arg({ type: 'RaidWhereUniqueInput' }),
        data: arg({ type: 'RaidUpdateInput' }),
      },
      resolve: async (parent, { where, data }, ctx) => {
        return await ctx.prisma.updateRaid({ where, data });
      },
    });
    t.field('deleteRaid', {
      type: 'Raid',
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        return await ctx.prisma.deleteRaid({ id });
      },
    });
  },
});
