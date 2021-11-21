import { makeSchema, asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import path from 'path'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from '../permissions'

import * as User from './types/User'
import * as UserProfile from './types/UserProfile'
import * as OpenSource from './types/OpenSource'
import * as OpenSourceProfile from './types/OpenSourceProfile'
import * as AccessToOpenSource from './types/AccessToOpenSource'
import * as Feed from './types/Feed'
import * as Comment from './types/Comment'
import * as CommentToComment from './types/CommentToComment'
import * as Reaction from './types/Reaction'
import * as Notification from './types/Notification'
import * as Task from './types/Task'
import * as TaskCard from './types/TaskCard'
import * as TaskCardComment from './types/TaskCardComment'
import * as TaskChatMessage from './types/TaskChatMessage'

export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

export const baseSchema = makeSchema({
  types: [User, UserProfile, OpenSource, OpenSourceProfile, GQLDate, AccessToOpenSource, Feed, Comment, CommentToComment, Reaction, Task, TaskCard, TaskCardComment, TaskChatMessage, Notification],
  plugins: [],
  outputs: {
    typegen: path.join(process.cwd(), 'src/graphql/schema/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'src/graphql/schema/schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = baseSchema
