import { objectType, extendType, stringArg, intArg, list, nonNull } from 'nexus'

export const Reaction = objectType({
  name: 'Reaction',
  definition(t) {
    t.int('id')
    t.field("feed", {
      type: "Feed",
    })
    t.int('feedId')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
  },
})

export const ReactionQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('reaction', {
      type: 'Reaction',
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.reaction.findUnique({
          where: { id },
        })
      },
    })

    t.field('reactions', {
      type: list('Reaction'),
      args: {
        skip: intArg(),
        take: intArg(),
        userId: intArg(),
        feedId: intArg(),
      },
      resolve: (_, { skip, take, feedId, userId }, ctx) => {
        return ctx.prisma.reaction.findMany({
          skip,
          take,
          where: {
            feedId,
            userId,
          },
          include: {
            user: true,
            feed: true
          },
        })
      },
    })
  },
})

export const ReactionMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createReaction', {
      type: 'Reaction',
      args: {
        userId: intArg(),
        feedId: intArg(),
      },
      resolve: (_, { feedId, userId }, ctx) => {
        return ctx.prisma.reaction.create({
          data: {
            feedId,
            userId,
          },
        })
      },
    })
    t.field('updateReaction', {
      type: 'Reaction',
      args: {
        id: nonNull(intArg()),
        content: stringArg(),
        userId: intArg(),
        feedId: intArg(),
      },
      resolve: (_, { id, feedId, userId }, ctx) => {
        return ctx.prisma.reaction.update({
          where: {
            id
          },
          data: {
            feedId,
            userId,
          }
        })
      },
    })
    t.field('deleteReaction', {
      type: 'Reaction',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.reaction.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
