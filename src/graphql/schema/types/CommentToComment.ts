import { objectType, extendType, stringArg, intArg, list, nonNull } from 'nexus'

export const CommentToComment = objectType({
  name: 'CommentToComment',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.string('content')
    t.field("firstComment", {
      type: "Comment",
    })
    t.int('firstCommentId')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
  },
})

export const CommentToCommentQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('commentToComment', {
      type: 'CommentToComment',
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.commentToComment.findUnique({
          where: { id },
        })
      },
    })

    t.field('commentToComments', {
      type: list('CommentToComment'),
      args: {
        skip: intArg(),
        take: intArg(),
        content: stringArg(),
        feedId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { skip, take, feedId, userId, content }, ctx) => {
        return ctx.prisma.commentToComment.findMany({
          skip,
          take,
          where: {
            feedId,
            userId,
            content: {
              contains: content
            },
          },
          include: {
            user: true,
          },
        })
      },
    })
  },
})

export const CommentToCommentMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createCommentToComment', {
      type: 'CommentToComment',
      args: {
        content: stringArg(),
        feedId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { content, feedId, userId }, ctx) => {
        return ctx.prisma.commentToComment.create({
          data: {
            content,
            feedId,
            userId
          },
        })
      },
    })
    t.field('updateCommentToComment', {
      type: 'CommentToComment',
      args: {
        id: nonNull(intArg()),
        content: stringArg(),
        feedId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { id, content, feedId, userId }, ctx) => {
        return ctx.prisma.commentToComment.update({
          where: {
            id
          },
          data: {
            content,
            feedId,
            userId
          }
        })
      },
    })
    t.field('deleteCommentToComment', {
      type: 'CommentToComment',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.commentToComment.delete({
          where: {
            id
          },
        })
      },
    })
  },
})

