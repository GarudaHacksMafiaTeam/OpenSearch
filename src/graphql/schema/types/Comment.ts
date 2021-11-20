import { objectType, extendType, stringArg, intArg, list, nonNull, booleanArg } from 'nexus'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.string('content')
    t.field("feed", {
      type: "Feed",
    })
    t.int('feedId')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
    t.field("comments", {
      type: list("CommentToComment"),
    })
  },
})

export const CommentQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('comment', {
      type: 'Comment',
      args: {
        id: intArg(),
        showComments: booleanArg(),
      },
      resolve: (_, { id, showComments }, ctx) => {
        return ctx.prisma.comment.findUnique({
          include: {
            comments: showComments
          },
          where: { id },
        })
      },
    })

    t.field('comments', {
      type: list('Comment'),
      args: {
        skip: intArg(),
        take: intArg(),
        content: stringArg(),
        feedId: intArg(),
        userId: intArg(),
        showComments: booleanArg(),
      },
      resolve: (_, { skip, take, feedId, userId, content, showComments }, ctx) => {
        return ctx.prisma.comment.findMany({
          skip,
          take,
          where: {
            feedId,
            userId,
            content: {
              contains: content,
            },
          },
          include: {
            feed: true,
            user: true,
            comments: showComments,
          },
        })
      },
    })
  },
})

export const CommentMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createComment', {
      type: 'Comment',
      args: {
        content: stringArg(),
        feedId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { content, feedId, userId }, ctx) => {
        return ctx.prisma.comment.create({
          data: {
            content,
            feedId,
            userId
          },
        })
      },
    })
    t.field('updateComment', {
      type: 'Comment',
      args: {
        id: nonNull(intArg()),
        content: stringArg(),
        feedId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { id, content, feedId, userId }, ctx) => {
        return ctx.prisma.comment.update({
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
    t.field('deleteComment', {
      type: 'Comment',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.comment.delete({
          where: {
            id
          },
        })
      },
    })
  },
})

