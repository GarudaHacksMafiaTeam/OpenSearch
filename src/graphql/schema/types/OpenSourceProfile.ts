import { objectType, extendType, stringArg, intArg, list, nonNull } from 'nexus'

export const OpenSourceProfile = objectType({
  name: 'OpenSourceProfile',
  definition(t) {
    t.int('id')
    t.int('openSourceId')
    t.string('name')
    t.string('image')
    t.string('description')
  },
})

export const OpenSourceProfileQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('openSourceProfile', {
      type: 'OpenSourceProfile',
      args: {
        id: intArg(),
        openSourceId: intArg(),
      },
      resolve: (_, { openSourceId, id }, ctx) => {
        return ctx.prisma.openSourceProfile.findUnique({
          where: { id, openSourceId },
        })
      },
    })
    t.field('openSourceProfiles', {
      type: list('OpenSourceProfile'),
      args: {
        skip: intArg(),
        take: intArg(),
        name: stringArg(),
        description: stringArg()
      },
      resolve: (_, { skip, take, name, description }, ctx) => {
        return ctx.prisma.openSourceProfile.findMany({
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

export const OpenSourceProfileMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOpenSourceProfile', {
      type: 'OpenSourceProfile',
      args: {
        openSourceId: nonNull(intArg()),
        image: stringArg(),
        description: stringArg(),
        name: stringArg(),
      },
      resolve: (_, { openSourceId, image, description, name }, ctx) => {
        return ctx.prisma.openSourceProfile.create({
          data: {
            openSourceId,
            image,
            description,
            name
          },
        })
      },
    })
    t.field('updateOpenSourceProfile', {
      type: 'OpenSourceProfile',
      args: {
        openSourceId: intArg(),
        image: stringArg(),
        description: stringArg(),
        name: stringArg(),
        id: intArg(),
      },
      resolve: (_, { id, openSourceId, name, description, image }, ctx) => {
        return ctx.prisma.openSourceProfile.update({
          where: {
            id,
            openSourceId
          },
          data: {
            description,
            name,
            image
          }
        })
      },
    })
    t.field('deleteOpenSourceProfile', {
      type: 'OpenSourceProfile',
      args: {
        id: intArg(),
        openSourceId: intArg(),
      },
      resolve: (_, { id, openSourceId }, ctx) => {
        return ctx.prisma.openSourceProfile.delete({
          where: {
            id, openSourceId
          },
        })
      },
    })
  },
})
