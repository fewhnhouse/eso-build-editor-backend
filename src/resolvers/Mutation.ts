import { stringArg, idArg, mutationType, arg, intArg } from 'nexus';
import { hash, compare } from 'bcryptjs';
import { APP_SECRET, getUserId } from '../utils';
import { sign } from 'jsonwebtoken';
import { setApiKey, send } from '@sendgrid/mail';
const crypto = require('crypto-random-string');

export const Mutation = mutationType({
  definition(t) {
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
      resolve: (parent, { data }, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.createBuild({
          ...data,
          owner: { connect: { id: userId } },
        });
      },
    });

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
                skillIds[index] !== 0
                  ? { connect: { skillId: skillIds[index] } }
                  : undefined,
            })
        );
      },
    });

    t.list.field('createSetSelections', {
      type: 'SkillSelection',
      args: {
        slots: arg({ list: true, type: 'String' }),
        types: arg({ list: true, type: 'String' }),
        traitDescriptions: arg({ list: true, type: 'String' }),
        glyphDescriptions: arg({ list: true, type: 'String' }),
        setIds: arg({ list: true, type: 'Int' }),
      },
      resolve: async (
        parent,
        { slots, traitDescriptions, glyphDescriptions, types, setIds },
        ctx
      ) => {
        return await slots.map(
          async (slot: string, index: number) =>
            await ctx.prisma.createSetSelection({
              slot,
              type: types && types[index] ? types[index] : '',
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
    /*
    t.field('createDraft', {
      type: 'Build',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.createBuild({
          title,
          content,
          author: { connect: { id: userId } },
        });
      },
    });
*/
    t.field('deleteBuild', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.deleteBuild({ id });
      },
    });

    t.field('publishBuild', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.updateBuild({
          where: { id },
          data: { published: true },
        });
      },
    });

    t.field('createRaid', {
      type: 'Raid',
      args: {
        data: arg({ type: 'RaidCreateInput' }),
      },
      resolve: (parent, { data }, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.createRaid({
          ...data,
          owner: { connect: { id: userId } },
        });
      },
    });

    t.field('createRole', {
      type: 'Role',
      args: {
        name: stringArg(),
        buildIds: idArg({ list: true }),
      },
      resolve: async (parent, { name, buildIds }, ctx) => {
        return ctx.prisma.createRole({
          name,
          builds: {
            connect: buildIds.map((id: string) => ({ id })),
          },
        });
      },
    });
  },
});
