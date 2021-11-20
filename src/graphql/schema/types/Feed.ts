import { objectType, extendType, stringArg, intArg, booleanArg, list, nonNull } from 'nexus'

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.string('title')
    t.string('content')
    t.boolean('published')
    t.field("openSource", {
      type: "OpenSource",
    })
    t.int('openSourceId')
    t.field("comments", {
      type: list("TaskCardComment"),
    })
    t.field("comments", {
      type: list("Comment"),
    })
    t.field("reactions", {
      type: list("Reaction"),
    })
  },
})

export const FeedQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('feed', {
      type: 'Feed',
      args: {
        id: intArg(),
        showComments: booleanArg(),
        showReactions: booleanArg(),
      },
      resolve: (_, { id, showComments, showReactions }, ctx) => {
        return ctx.prisma.feed.findUnique({
          include: {
            comments: showComments,
            reactions: showReactions
          },
          where: { id },
        })
      },
    })

    t.field('feeds', {
      type: list('Feed'),
      args: {
        skip: intArg(),
        take: intArg(),
        title: stringArg(),
        content: stringArg(),
        openSourceId: intArg(),
        showComments: booleanArg(),
        showReactions: booleanArg(),
      },
      resolve: (_, { skip, take, title, content, openSourceId, showComments, showReactions }, ctx) => {
        return ctx.prisma.feed.findMany({
          skip,
          take,
          where: {
            openSourceId,
            title: {
              contains: title
            },
            content: {
              contains: content
            },
          },
          include: {
            openSource: true,
            comments: showComments,
            reactions: showReactions
          },
        })
      },
    })
  },
})

export const FeedMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createFeed', {
      type: 'Feed',
      args: {
        title: stringArg(),
        content: stringArg(),
        openSourceId: intArg(),
      },
      resolve: (_, { title, content, openSourceId }, ctx) => {
        return ctx.prisma.feed.create({
          data: {
            title,
            content,
            openSourceId
          },
        })
      },
    })
    t.field('updateFeed', {
      type: 'Feed',
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        content: stringArg(),
        openSourceId: intArg(),
      },
      resolve: (_, { id, title, content, openSourceId }, ctx) => {
        return ctx.prisma.feed.update({
          where: {
            id
          },
          data: {
            title,
            content,
            openSourceId
          }
        })
      },
    })
    t.field('deleteFeed', {
      type: 'Feed',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.feed.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
