import {PrismaClient} from '@prisma/client'

declare global{
    var prisma : PrismaClient | undefined
};

// devde bozulma olmasın diye yeni instancelar uretilmicek artik
const prismadb = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb; 

export default prismadb;

// dont forget exporting