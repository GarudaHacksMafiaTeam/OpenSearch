import { objectType, extendType, stringArg, intArg, arg, list, nonNull, enumType, booleanArg } from 'nexus'


export const ProgressEnum = enumType({
  name: 'Progress',
  members: ['NEW', 'READY', 'ONGOING', 'DONE'],
})

export const TaskCard = objectType({
  name: 'TaskCard',
  definition(t) {
    t.int('id')
    t.field("task", {
      type: "Task",
    })
    t.int('taskId')
    t.field("asignee", {
      type: "User",
    })
    t.int('asigneeId')
    t.date('createdAt')
    t.string('title')
    t.string('description')
    t.field("progress", {
      type: "Progress"
    })
    t.field("comments", {
      type: list("TaskCardComment"),
    })
  },
})

export const TaskCardQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('taskCard', {
      type: 'TaskCard',
      args: {
        id: intArg(),
        showComments: booleanArg(),
      },
      resolve: (_, { id, showComments }, ctx) => {
        return ctx.prisma.taskCard.findUnique({
          where: { id },
          include: { comments: showComments }
        })
      },
    })

    t.field('taskCards', {
      type: list('TaskCard'),
      args: {
        skip: intArg(),
        take: intArg(),
        asigneeId: intArg(),
        taskId: intArg(),
        title: stringArg(),
        description: stringArg(),
        showComments: booleanArg()
      },
      resolve: (_, { skip, take, title, description, taskId, asigneeId, showComments }, ctx) => {
        return ctx.prisma.taskCard.findMany({
          skip,
          take,
          include: { comments: showComments },
          where: {
            asigneeId,
            taskId,
            title: {
              contains: title,
            },
            description: {
              contains: description
            }
          },
        })
      },
    })
  },
})

export const TaskCardMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTaskCard', {
      type: 'TaskCard',
      args: {
        asigneeId: intArg(),
        taskId: intArg(),
        title: stringArg(),
        description: stringArg(),
        progress: arg({
          type: "Progress"
        })
      },
      resolve: (_, { asigneeId, taskId, title, description, progress }, ctx) => {
        return ctx.prisma.taskCard.create({
          data: {
            asigneeId,
            taskId,
            title,
            description,
            progress
          },
        })
      },
    })
    t.field('updateTaskCard', {
      type: 'TaskCard',
      args: {
        id: nonNull(intArg()),
        asigneeId: intArg(),
        taskId: intArg(),
        title: stringArg(),
        description: stringArg(),
        progress: arg({
          type: "Progress",
        })
      },
      resolve: (_, { id, title, description, taskId, asigneeId, progress }, ctx) => {
        return ctx.prisma.taskCard.update({
          where: {
            id
          },
          data: {
            asigneeId,
            taskId,
            title,
            description,
            progress
          }
        })
      },
    })
    t.field('deleteTaskCard', {
      type: 'TaskCard',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.taskCard.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
