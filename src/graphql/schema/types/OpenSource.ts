import { objectType, extendType, stringArg, intArg, booleanArg, list } from 'nexus'

export const OpenSource = objectType({
  name: 'OpenSource',
  definition(t) {
    t.int('id')
    t.field("profile", {
      type: "OpenSourceProfile",
    })
    t.field("feeds", {
      type: list("Feed"),
    })
    t.field("tasks", {
      type: list("Task"),
    })
    t.field("userAccesses", {
      type: list("User"),
    })
  },
})

export const OpenSourceQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('openSource', {
      type: 'OpenSource',
      args: {
        id: intArg(),
        showFeeds: booleanArg(),
        showTasks: booleanArg(),
        showUserAccesses: booleanArg(),
      },
      resolve: (_, { id, showFeeds, showTasks, showUserAccesses }, ctx) => {
        return ctx.prisma.openSource.findUnique({
          include: {
            profile: true,
            feeds: showFeeds,
            tasks: showTasks,
            userAccesses: showUserAccesses
          },
          where: { id },
        })
      },
    })

    t.field('openSources', {
      type: list('OpenSource'),
      args: {
        skip: intArg(),
        take: intArg(),
        name: stringArg(),
        description: stringArg(),
        showFeeds: booleanArg(),
        showTasks: booleanArg(),
        showUserAccesses: booleanArg(),
      },
      resolve: (_, { skip, take, showFeeds, showTasks, showUserAccesses }, ctx) => {
        return ctx.prisma.openSource.findMany({
          skip,
          take,
          include: {
            profile: true,
            feeds: showFeeds,
            tasks: showTasks,
            userAccesses: showUserAccesses
          },
        })
      },
    })
  },
})

export const OpenSourceMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOpenSource', {
      type: 'OpenSource',
      args: {},
      resolve: (_, _args, ctx) => {
        return ctx.prisma.openSource.create({
          data: {},
        })
      },
    })
    t.field('deleteOpenSource', {
      type: 'OpenSource',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.openSource.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
