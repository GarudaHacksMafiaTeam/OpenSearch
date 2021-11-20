import { objectType, extendType, stringArg, intArg, list, nonNull } from 'nexus'

export const TaskChatMessage = objectType({
  name: 'TaskChatMessage',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.string('content')
    t.field("task", {
      type: "Task",
    })
    t.int('taskId')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
  },
})

export const TaskChatMessageQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('taskChatMessage', {
      type: 'TaskChatMessage',
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.taskChatMessage.findUnique({
          where: { id },
        })
      },
    })

    t.field('taskChatMessages', {
      type: list('TaskChatMessage'),
      args: {
        skip: intArg(),
        take: intArg(),
        content: stringArg(),
        taskId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { skip, take, taskId, userId, content }, ctx) => {
        return ctx.prisma.taskChatMessage.findMany({
          skip,
          take,
          where: {
            taskId,
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

export const TaskChatMessageMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTaskChatMessage', {
      type: 'TaskChatMessage',
      args: {
        content: stringArg(),
        taskId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { content, taskId, userId }, ctx) => {
        return ctx.prisma.taskChatMessage.create({
          data: {
            content,
            taskId,
            userId
          },
        })
      },
    })
    t.field('updateTaskChatMessage', {
      type: 'TaskChatMessage',
      args: {
        id: nonNull(intArg()),
        content: stringArg(),
        taskId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { id, content, taskId, userId }, ctx) => {
        return ctx.prisma.taskChatMessage.update({
          where: {
            id
          },
          data: {
            content,
            taskId,
            userId
          }
        })
      },
    })
    t.field('deleteTaskChatMessage', {
      type: 'TaskChatMessage',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.taskChatMessage.delete({
          where: {
            id
          },
        })
      },
    })
  },
})

