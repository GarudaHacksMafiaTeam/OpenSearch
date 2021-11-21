import { objectType, extendType, stringArg, intArg, list, nonNull } from 'nexus'

export const UserProfile = objectType({
  name: 'UserProfile',
  definition(t) {
    t.int('id')
    t.int('userId')
    t.string('name')
    t.string('image')
    t.string('description')
  },
})

export const UserProfileQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('userProfile', {
      type: 'UserProfile',
      args: {
        id: intArg(),
        userId: intArg(),
      },
      resolve: (_, { userId, id }, ctx) => {
        return ctx.prisma.userProfile.findUnique({
          where: { id, userId },
        })
      },
    })
    t.field('userProfiles', {
      type: list('UserProfile'),
      args: {
        skip: intArg(),
        take: intArg(),
        description: stringArg()
      },
      resolve: (_, { skip, take, description }, ctx) => {
        return ctx.prisma.userProfile.findMany({
          skip,
          take,
          where: {
            description: {
              contains: description
            }
          }
        })
      },
    })
  },
})

export const UserProfileMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createUserProfile', {
      type: 'UserProfile',
      args: {
        userId: nonNull(intArg()),
        description: stringArg(),
      },
      resolve: (_, { userId, description }, ctx) => {
        return ctx.prisma.userProfile.create({
          data: {
            userId,
            description,
          },
        })
      },
    })
    t.field('updateUserProfile', {
      type: 'UserProfile',
      args: {
        userId: intArg(),
        description: stringArg(),
        id: intArg(),
      },
      resolve: (_, { id, userId, description }, ctx) => {
        return ctx.prisma.userProfile.update({
          where: {
            id,
            userId
          },
          data: {
            description,
          }
        })
      },
    })
    t.field('deleteUserProfile', {
      type: 'UserProfile',
      args: {
        id: intArg(),
        userId: intArg(),
      },
      resolve: (_, { id, userId }, ctx) => {
        return ctx.prisma.userProfile.delete({
          where: {
            id, userId
          },
        })
      },
    })
  },
})
