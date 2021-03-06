import { stringArg, idArg, mutationType, arg, intArg } from 'nexus';
import { hash, compare } from 'bcryptjs';
import { getUserId } from '../utils';
import { sign } from 'jsonwebtoken';
import { setApiKey, send } from '@sendgrid/mail';
require('dotenv').config();

const webhook = require("webhook-discord")
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
        const { userId } = await ctx.prisma
          .verification({ token })
        if (!userId) {
          throw new Error('Invalid token.');
        }
        const user = await ctx.prisma.updateUser({
          data: { verified: true },
          where: { id: userId },
        });
        if (user) {
          return {
            token: sign({ userId: user.id }, process.env.TOKEN_SECRET),
            user,
          };
        } else {
          throw new Error('Invalid token.');
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
          userId: user.id
        });
        setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: email,
          from: 'noreply@buildeditor.com',
          subject: 'Verification Email ESO Build Editor',
          text:
            `Copy this link to your browser to verify your account: ${process.env.VERIFY_URL}/verify/${token}`,
          html: `<strong>Click this link to verify your account:<a href="${process.env.VERIFY_URL}/verify/${token}">Link</a> </strong>`,
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
          token: sign({ userId: user.id }, process.env.TOKEN_SECRET),
          user,
        };
      },
    });

    t.field('updateWebhook', {
      type: 'User',
      args: {
        webhook: stringArg()
      },
      resolve: async (parent, { webhook }, context) => {
        const id = await getUserId(context)
        const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
        const isValid = urlRegex.test(webhook);
        if (!isValid) {
          throw new Error("Invalid Webhook URL")
        }
        return await context.prisma.updateUser({ where: { id }, data: { webhook } })
      }
    })

    t.field('deleteAccount', {
      type: 'User',
      args: {
        oldPassword: stringArg()
      },
      resolve: async (parent, { oldPassword }, context) => {
        const userId = await getUserId(context)
        const user = await context.prisma.user({ id: userId })
        if (!user) {
          throw new Error(`No user found`);
        }
        const oldPasswordValid = await compare(oldPassword, user.password);
        if (oldPasswordValid) {
          await context.prisma.deleteUser({ id: userId })
          return user
        } else {
          throw new Error('Invalid password')
        }
      }
    })

    t.field('resendVerification', {
      type: 'User',
      resolve: async (parent, args, context) => {
        const userId = await getUserId(context)
        const user = await context.prisma.user({ id: userId })
        const { email } = user;
        const sendMail = async (token: string) => {
          setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: email,
            from: 'noreply@buildeditor.com',
            subject: 'Verification Email ESO Build Editor',
            text:
              `Copy this link to your browser to verify your account: ${process.env.VERIFY_URL}/verify/${token}`,
            html: `<strong>Click this link to verify your account:<a href="${process.env.VERIFY_URL}/verify/${token}">Link</a> </strong>`,
          };
          return await send(msg);
        }
        try {

          const { token } = await context.prisma
            .verification({ userId })
          await sendMail(token)
        } catch (e) {

          const token = crypto({ length: 32 });
          await context.prisma.createVerification({
            token,
            userId
          });
          await sendMail(token)
        }
        return user;
      }
    })

    t.field('updateEmail', {
      type: 'User',
      args: {
        newEmail: stringArg(),
        oldPassword: stringArg()
      },
      resolve: async (parent, { newEmail, oldPassword }: any, context) => {
        const userId = await getUserId(context)
        const user = await context.prisma.user({ id: userId })
        if (!user) {
          throw new Error(`No user found`);
        }
        const oldPasswordValid = await compare(oldPassword, user.password);
        if (oldPasswordValid) {
          const user = await context.prisma.updateUser({
            where: {
              id: userId
            }, data: {
              email: newEmail,
              verified: false,
            }
          });

          const token = crypto({ length: 32 });
          await context.prisma.updateVerification({
            where: { userId }, data: {
              token,
            }
          })
          setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: newEmail,
            from: 'noreply@buildeditor.com',
            subject: 'Verification Email ESO Build Editor',
            text:
              `Copy this link to your browser to verify your account: ${process.env.VERIFY_URL}/verify/${token}`,
            html: `<strong>Click this link to verify your account:<a href="${process.env.VERIFY_URL}/verify/${token}">Link</a> </strong>`,
          };
          await send(msg);

          return user;
        } else {
          throw new Error(`Invalid password.`)
        }
      }
    })

    t.field('updatePassword', {
      type: 'User',
      args: {
        newPassword: stringArg(),
        oldPassword: stringArg()
      },
      resolve: async (parent, { newPassword, oldPassword }, context) => {
        const userId = await getUserId(context)
        const user = await context.prisma.user({ id: userId })
        if (!user) {
          throw new Error(`No user found`);
        }
        const oldPasswordValid = await compare(oldPassword, user.password);
        if (oldPasswordValid) {
          const hashedPassword = await hash(newPassword, 10)
          return await context.prisma.updateUser({
            where: { id: userId }, data: {
              password: hashedPassword
            }
          })
        } else {
          throw new Error(`Invalid password.`)
        }
      }
    })

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
      resolve: async (parent, { data }: any, ctx) => {
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
        const userId = getUserId(ctx)
        const user = await ctx.prisma.user({ id: userId })
        const build = await ctx.prisma.updateBuild({ where, data })
        if (user.webhook) {
          const DiscordWebhook = new webhook.Webhook(user.webhook || "")
          const msg = new webhook.MessageBuilder()
            .setName('Build & Raid Editor')
            .setTitle(`Build ${build.name} has been updated!`)
            .addField('', build.description)
            .setColor("#16a085")
            .setImage(`${process.env.IMAGE_SERVICE}/classes/${build.esoClass}.png`)
            .addField("Info", build.race + " " + build.esoClass)
            .setFooter(`${process.env.VERIFY_URL}/builds/${build.id}`)
          DiscordWebhook.send(msg)
        }
        return build;
      }
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
      resolve: async (parent, { where, data }: any, ctx) => {
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
      resolve: async (parent, { where, data }: any, ctx) => {
        return await ctx.prisma.updateSetSelection({
          data,
          where,
        });
      },
    });

    /**
     * BUILD REVISIONS
     */

    t.field('createBuildRevision', {
      type: 'BuildRevision',
      args: { data: arg({ type: 'BuildRevisionCreateInput' }) },
      resolve: async (parent, { data }: any, ctx) => {
        const userId = getUserId(ctx);
        return await ctx.prisma.createBuildRevision({
          ...data,
          owner: { connect: { id: userId } },
        })
      }
    })

    t.field('deleteBuildRevision', {
      type: 'BuildRevision',
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        return await ctx.prisma.deleteBuildRevision({ id });
      },
    });

    t.field('addBuildToRevision', {
      type: 'BuildRevision',
      args: { id: idArg(), buildId: idArg() },
      resolve: (parent, { id, buildId }, ctx) => {
        return ctx.prisma.updateBuildRevision({
          where: { id },
          data: {
            builds: {
              connect: { id: buildId }
            }
          }
        })
      }
    })
    /**
     * RAIDS
     */
    t.field('createRaid', {
      type: 'Raid',
      args: {
        data: arg({ type: 'RaidCreateInput' }),
      },
      resolve: async (parent, { data }: any, ctx) => {
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
        const userId = getUserId(ctx)
        const user = await ctx.prisma.user({ id: userId })

        const raid = await ctx.prisma.updateRaid({ where, data });
        if (user.webhook) {
          const DiscordWebhook = new webhook.Webhook(user.webhook || "")
          const msg = new webhook.MessageBuilder()
            .setName('Build & Raid Editor')
            .setTitle(`Raid ${raid.name} has been updated!`)
            .setColor("#f39c12")
            .setFooter(`${process.env.VERIFY_URL}/raids/${raid.id}`)

          DiscordWebhook.send(msg)
        }
        return raid;
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

    /**
     * RAID REVISIONS
     */

    t.field('createRaidRevision', {
      type: 'RaidRevision',
      args: { data: arg({ type: 'RaidRevisionCreateInput' }) },
      resolve: async (parent, { data }: any, ctx) => {
        const userId = getUserId(ctx);
        return await ctx.prisma.createRaidRevision({
          ...data,
          owner: { connect: { id: userId } },
        })
      }
    })

    t.field('deleteRaidRevision', {
      type: 'RaidRevision',
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        return await ctx.prisma.deleteRaidRevision({ id });
      },
    });

    t.field('addRaidToRevision', {
      type: 'RaidRevision',
      args: { id: idArg(), raidId: idArg() },
      resolve: (parent, { id, raidId }, ctx) => {
        return ctx.prisma.updateRaidRevision({
          where: { id },
          data: {
            raids: {
              connect: { id: raidId }
            }
          }
        })
      }
    })

    /**
 * GROUPS
 */
    t.field('createGroup', {
      type: 'Group',
      args: {
        data: arg({ type: 'GroupCreateInput' }),
      },
      resolve: async (parent, { data }: any, ctx) => {
        const userId = getUserId(ctx);
        return await ctx.prisma.createGroup({
          ...data,
          owner: { connect: { id: userId } },
        });
      },
    });

    t.field('updateGroup', {
      type: 'Group',
      args: {
        where: arg({ type: 'GroupWhereUniqueInput' }),
        data: arg({ type: 'GroupUpdateInput' }),
      },
      resolve: async (parent, { where, data }, ctx) => {
        return await ctx.prisma.updateGroup({ where, data });
      },
    });
    t.field('deleteGroup', {
      type: 'Group',
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        return await ctx.prisma.deleteGroup({ id });
      },
    });
  },
});
