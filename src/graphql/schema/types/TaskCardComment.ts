import { objectType, extendType, stringArg, intArg, list, nonNull } from 'nexus'

export const TaskCardComment = objectType({
  name: 'TaskCardComment',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.string('content')
    t.field("taskCard", {
      type: "TaskCard",
    })
    t.int('taskCardId')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
  },
})

export const TaskCardCommentQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('taskCardComment', {
      type: 'TaskCardComment',
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.taskCardComment.findUnique({
          where: { id },
        })
      },
    })

    t.field('taskCardComments', {
      type: list('TaskCardComment'),
      args: {
        skip: intArg(),
        take: intArg(),
        content: stringArg(),
        taskCardId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { skip, take, taskCardId, userId, content }, ctx) => {
        return ctx.prisma.taskCardComment.findMany({
          skip,
          take,
          where: {
            taskCardId,
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

export const TaskCardCommentMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTaskCardComment', {
      type: 'TaskCardComment',
      args: {
        content: stringArg(),
        taskCardId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { content, taskCardId, userId }, ctx) => {
        return ctx.prisma.taskCardComment.create({
          data: {
            content,
            taskCardId,
            userId
          },
        })
      },
    })
    t.field('updateTaskCardComment', {
      type: 'TaskCardComment',
      args: {
        id: nonNull(intArg()),
        content: stringArg(),
        userId: intArg(),
        taskCardId: intArg()
      },
      resolve: (_, { id, content, taskCardId, userId }, ctx) => {
        return ctx.prisma.taskCardComment.update({
          where: {
            id
          },
          data: {
            content,
            taskCardId,
            userId
          }
        })
      },
    })
    t.field('deleteTaskCardComment', {
      type: 'TaskCardComment',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.taskCardComment.delete({
          where: {
            id
          },
        })
      },
    })
  },
})

