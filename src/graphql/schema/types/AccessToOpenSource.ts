import { objectType, extendType, enumType, intArg, list, arg } from 'nexus'

export const RoleEnum = enumType({
  name: 'Role',
  members: ['OWNER', 'CONTRIBUTOR'],
})

export const AccessToOpenSource = objectType({
  name: 'AccessToOpenSource',
  definition(t) {
    t.int('id')
    t.field("openSource", {
      type: "OpenSource",
    })
    t.int('openSourceId')
    t.field("user", {
      type: "User",
    })
    t.int('userId')
    t.field('role', {
      type: "Role"
    })
  },
})

export const AccessToOpenSourceQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('accessToOpenSource', {
      type: 'AccessToOpenSource',
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.accessToOpenSource.findUnique({
          where: {
            id,
          },
          include: {
            user: true,
            openSource: {
              include: {
                profile: true
              }
            }
          }
        })
      },
    })

    t.field('accessToOpenSources', {
      type: list('AccessToOpenSource'),
      args: {
        skip: intArg(),
        take: intArg(),
        userId: intArg(),
        openSourceId: intArg(),
      },
      resolve: (_, { skip, take, userId, openSourceId }, ctx) => {
        return ctx.prisma.accessToOpenSource.findMany({
          skip,
          take,
          where: {
            userId,
            openSourceId
          },
          include: {
            user: true,
            openSource: {
              include: {
                profile: true
              }
            }
          }
        })
      },
    })
  },
})

export const AccessToOpenSourceMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createAccessToOpenSource', {
      type: 'AccessToOpenSource',
      args: {
        userId: intArg(),
        openSourceId: intArg(),
        role: arg({
          type: "Role",
        })
      },
      resolve: (_, { userId, openSourceId, role }, ctx) => {
        return ctx.prisma.accessToOpenSource.create({
          data: {
            userId,
            openSourceId,
            role
          },
        })
      },
    })
    t.field('deleteAccessToOpenSource', {
      type: 'AccessToOpenSource',
      args: {
        id: intArg()
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.accessToOpenSource.delete({
          where: {
            id
          },
        })
      },
    })
  },
})
