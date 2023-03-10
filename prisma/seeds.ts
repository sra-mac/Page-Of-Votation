import { PrismaClient } from '@prisma/client'
import { createParticipantsSeeds } from './seeds/create-participants'

const client = new PrismaClient()

const main = async () => {
   await createParticipantsSeeds()
}

main().then(async () => {
    await client.$disconnect()
} ).catch(async (e)=>{
    console.log(e);
    await client.$disconnect()
    process.exit(1);
})

export default client