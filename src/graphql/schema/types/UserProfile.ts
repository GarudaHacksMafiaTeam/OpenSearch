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
        name: stringArg(),
        description: stringArg()
      },
      resolve: (_, { skip, take, name, description }, ctx) => {
        return ctx.prisma.userProfile.findMany({
          skip,
          take,
          where: {
            name: {
              contains: name
            },
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
        image: stringArg(),
        description: stringArg(),
        name: stringArg(),
      },
      resolve: (_, { userId, image, description, name }, ctx) => {
        return ctx.prisma.userProfile.create({
          data: {
            userId,
            image,
            description,
            name
          },
        })
      },
    })
    t.field('updateUserProfile', {
      type: 'UserProfile',
      args: {
        userId: intArg(),
        image: stringArg(),
        description: stringArg(),
        name: stringArg(),
        id: intArg(),
      },
      resolve: (_, { id, userId, name, description, image }, ctx) => {
        return ctx.prisma.userProfile.update({
          where: {
            id,
            userId
          },
          data: {
            description,
            name,
            image
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
