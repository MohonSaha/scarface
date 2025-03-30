import { PrismaClient } from "@prisma/client";


const PrismaClientSingleton = () => {
    return new PrismaClient()
}


declare const globalThis: {
    prisma: ReturnType<typeof PrismaClientSingleton>;
    prismaGlobal: ReturnType<typeof PrismaClientSingleton> | undefined;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();  

export default prisma;
// Prevent multiple instances of Prisma Client in development

if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
}