import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export interface Context {
  prisma: PrismaClient
  res: ServerResponse
  req: MicroRequest
}

export function createContext({ res, req }): Context {
  return { prisma, res, req }
}
