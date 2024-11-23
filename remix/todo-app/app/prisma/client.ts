import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
