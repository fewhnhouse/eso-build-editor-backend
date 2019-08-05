import { stringArg, idArg, mutationType, arg, intArg } from 'nexus'
import { hash, compare } from 'bcrypt'
import { APP_SECRET, getUserId } from '../utils'
import { sign } from 'jsonwebtoken'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.createUser({
          name,
          email,
          password: hashedPassword,
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user({ email })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

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
        const userId = getUserId(ctx)
        return ctx.prisma.createBuild({
          name,
          race,
          esoClass,
        })
      },
    })

    t.field('createBuild', {
      type: 'Build',
      args: {
        data: arg({ type: "BuildCreateInput" })
      },
      resolve: (parent, { data }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.createBuild({
          ...data,
          owner: { connect: { id: userId } },
        })
      },
    })


    t.list.field('createSkillSelections', {
      type: 'SkillSelection',
      args: {
        indices: arg({ list: true, type: "Int" }),
        skillIds: arg({ list: true, type: "Int" })
      },
      resolve: async (parent, { indices, skillIds }, ctx) => {
        return await indices.map(async (index: number) => await ctx.prisma.createSkillSelection({
          index,
          skill: skillIds[index] !== 0 ? { connect: { skillId: skillIds[index] } } : undefined
        }))
      }
    })

    t.list.field('createSetSelections', {
      type: 'SkillSelection',
      args: {
        slots: arg({ list: true, type: "String" }),
        traitDescriptions: arg({ list: true, type: "String" }),
        glyphDescriptions: arg({ list: true, type: "String" }),
        setIds: arg({ list: true, type: "Int" })
      },
      resolve: async (parent, { slots, traitDescriptions, glyphDescriptions, setIds }, ctx) => {
        return await slots.map(async (slot: string, index: number) => await ctx.prisma.createSetSelection({
          slot,
          trait: traitDescriptions[index] ? { connect: { description: traitDescriptions[index] } } : undefined,
          glyph: glyphDescriptions[index] ? { connect: { description: glyphDescriptions[index] } } : undefined,
          selectedSet: setIds[index] ? { connect: { setId: setIds[index] } } : undefined
        }))
      }
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.createPost({
          title,
          content,
          author: { connect: { id: userId } },
        })
      },
    })

    t.field('deleteBuild', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.deleteBuild({ id })
      },
    })

    t.field('publishBuild', {
      type: 'Build',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.updateBuild({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})
