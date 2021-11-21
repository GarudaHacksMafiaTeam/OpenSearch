import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { prisma } from 'graphql/context'

import { NextApiHandler } from 'next'

const options = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: '/auth/verify-request',
  },
  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),

  secret: process.env.AUTH_SECRET,
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
