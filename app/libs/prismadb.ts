import { PrismaClient } from "@prisma/client"

declare global{
    var prisma: PrismaClient | undefined
}

// to prevent creating new PrismaClient due to nextJs 13 hotreloading, a global variable is not affected by hot reloading
const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV!=='production') globalThis.prisma = client

export default client;