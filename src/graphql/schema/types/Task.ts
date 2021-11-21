import { objectType, extendType, stringArg, intArg, list, nonNull, booleanArg } from 'nexus'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.int('id')
    t.field("openSource", {
      type: "OpenSource",
    })
    t.int('openSourceId')
    t.string('title')
    t.string('description')
    t.field("contributors", {
      type: list("User"),
    })
    t.field("cards", {
      type: list("TaskCard"),
    })
    t.field("chatMessages", {
      type: list("TaskChatMessage"),
    })
  },
})

export const TaskQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('task', {
      type: 'Task',
      args: {
        id: intArg(),
        showContributors: booleanArg(),
        showCards: booleanArg(),
        showChatMessages: booleanArg()
      },
      resolve: (_, { id, showContributors, showCards, showChatMessages }, ctx) => {
        return ctx.prisma.task.findUnique({
          include: {
            openSource: true,
            contributors: showContributors,
            cards: showCards,
            chatMessages: showChatMessages
          },
          where: {
            id
          },
        })
      },
    })

    t.field('tasks', {
      type: list('Task'),
      args: {
        skip: intArg(),
        take: intArg(),
        openSourceId: intArg(),
        title: stringArg(),
        description: stringArg(),
        showContributors: booleanArg(),
        showCards: booleanArg(),
        showChatMessages: booleanArg()
      },
      resolve: (_, { skip, take, openSourceId, title, description, showContributors, showCards, showChatMessages }, ctx) => {
        return ctx.prisma.task.findMany({
          skip,
          take,
          where: {
            openSourceId,
            title: {
              contains: title,
            },
            description: {
              contains: description
            }
          },
          include: {
            openSource: true,
            contributors: showContributors,
            cards: showCards,
            chatMessages: showChatMessages
          },
        })
      },
    })
  },
})

export const TaskMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTask', {
      type: 'Task',
      args: {
        openSourceId: intArg(),
        title: stringArg(),
        description: stringArg()
      },
      resolve: (_, { openSourceId, title, description }, ctx) => {
        return ctx.prisma.task.create({
          data: {
            openSourceId,
            title,
            description
          },
        })
      },
    })
    t.field('updateTask', {
      type: 'Task',
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        description: stringArg()
      },
      resolve: (_, { id, title, description }, ctx) => {
        return ctx.prisma.task.update({
          where: {
            id
          },
          data: {
            title,
            description
          }
        })
      },
    })
    t.field('deleteTask', {
      type: 'Task',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.task.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
