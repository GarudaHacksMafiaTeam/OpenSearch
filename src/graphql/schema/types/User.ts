import { objectType, extendType, stringArg, nonNull, intArg, booleanArg, list } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('email')
    t.string('image')
    t.string('name')
    t.date('createdAt')
    t.date('updatedAt')
    t.field("profile", {
      type: "UserProfile",
    })
    t.field("comments", {
      type: list("Comment"),
    })
    t.field("commentsToComment", {
      type: list("CommentToComment"),
    })
    t.field("taskAccessible", {
      type: list("Task"),
    })
    t.field("taskCards", {
      type: list("TaskCard"),
    })
    t.field("commentsToCards", {
      type: list("TaskCardComment"),
    })
    t.field("accessToOpenSources", {
      type: list("AccessToOpenSource"),
    })
    t.field("taskChatMessages", {
      type: list("TaskChatMessage"),
    })
    t.field("notifications", {
      type: list("Notification"),
    })
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      type: 'User',
      args: {
        id: intArg(),
        email: stringArg(),
        name: stringArg(),
        showComments: booleanArg(),
        showCommentsToComment: booleanArg(),
        showTasksAccessible: booleanArg(),
        showTaskCards: booleanArg(),
        showCommentsToCards: booleanArg(),
        showTaskChatMessages: booleanArg(),
      },
      resolve: (_, {
        email, id, showComments, showCommentsToComment,
        showTasksAccessible, showTaskCards, showCommentsToCards,
        showTaskChatMessages, showReactions, name
      }, ctx) => {
        return ctx.prisma.user.findUnique({
          include: {
            profile: true,
            notifications: true,
            accessToOpenSources: {
              include: {
                openSource: {
                  include: {
                    profile: true
                  },
                }
              }
            },
            comments: showComments,
            commentsToComment: showCommentsToComment,
            tasksAccessible: showTasksAccessible,
            taskCards: showTaskCards,
            commentsToCards: showCommentsToCards,
            taskChatMessages: showTaskChatMessages,
          },
          where: {
            id, email,
          },
        })
      },
    })
    t.field('users', {
      type: list('User'),
      args: {
        skip: intArg(),
        take: intArg(),
        email: stringArg(),
        name: stringArg(),
        showComments: booleanArg(),
        showCommentsToComment: booleanArg(),
        showTasksAccessible: booleanArg(),
        showTaskCards: booleanArg(),
        showCommentsToCards: booleanArg(),
        showTaskChatMessages: booleanArg(),
      },
      resolve: (_, { skip, take, email, name,
        showComments, showCommentsToComment, showTasksAccessible,
        showTaskCards, showCommentsToCards, showTaskChatMessages, showReactions
      }, ctx) => {
        return ctx.prisma.user.findMany({
          skip,
          take,
          include: {
            profile: true,
            comments: showComments,
            commentsToComment: showCommentsToComment,
            tasksAccessible: showTasksAccessible,
            taskCards: showTaskCards,
            commentsToCards: showCommentsToCards,
            taskChatMessages: showTaskChatMessages,
          },
          where: {
            email,
            name: {
              contains: name
            }
          }
        })
      },
    })
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        name: stringArg(),
        image: stringArg(),
      },
      resolve: (_, { email, name, image }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            email,
            name,
            image
          },
        })
      },
    })
    t.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        email: stringArg(),
        name: stringArg(),
        image: stringArg(),
      },
      resolve: (_, { id, email, name, image }, ctx) => {
        return ctx.prisma.user.update({
          where: {
            id
          },
          data: {
            email,
            name,
            image
          }
        })
      },
    })
    t.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.user.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
