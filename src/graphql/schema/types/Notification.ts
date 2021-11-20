import { objectType, extendType, stringArg, intArg, booleanArg, list, nonNull } from 'nexus'

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.int('id')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
    t.date('createdAt')
    t.string('content')
    t.string('link')
    t.boolean('read')
  },
})

export const NotificationQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('notification', {
      type: 'Notification',
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.notification.findUnique({
          where: { id },
        })
      },
    })

    t.field('notifications', {
      type: list('Notification'),
      args: {
        skip: intArg(),
        take: intArg(),
        userId: intArg(),
        content: stringArg(),
        link: stringArg(),
        read: booleanArg(),
      },
      resolve: (_, { skip, take, userId, read, link, content }, ctx) => {
        return ctx.prisma.notification.findMany({
          skip,
          take,
          where: {
            userId,
            read,
            link: {
              contains: link
            },
            content: {
              contains: content
            },
          },
          include: {
            user: true
          },
        })
      },
    })
  },
})

export const NotificationMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createNotification', {
      type: 'Notification',
      args: {
        userId: intArg(),
        content: stringArg(),
        link: stringArg(),
        read: booleanArg(),
      },
      resolve: (_, { userId, content, link, read }, ctx) => {
        return ctx.prisma.notification.create({
          data: {
            userId,
            content,
            link,
            read
          },
        })
      },
    })
    t.field('updateNotification', {
      type: 'Notification',
      args: {
        id: nonNull(intArg()),
        content: stringArg(),
        link: stringArg(),
        read: booleanArg(),
      },
      resolve: (_, { id, content, link, read }, ctx) => {
        return ctx.prisma.notification.update({
          where: {
            id
          },
          data: {
            content,
            link,
            read,
          }
        })
      },
    })
    t.field('deleteNotification', {
      type: 'Notification',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.notification.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
