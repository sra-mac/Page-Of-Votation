import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export const participants = [
    {
        name: "Java",
        username:"java",
        avatar: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
    },
    {
        name: "JavaScript",
        username:"javascript",
        avatar: 'https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png'
    },
    {
        name: "Php",
        username:"php",
        avatar: 'https://www.php.net/images/logos/new-php-logo.svg'
    },
    {
        name: "Ruby",
        username:"ruby",
        avatar: 'https://openwhisk.apache.org/images/runtimes/icon-ruby-text-color-horz.png'
    },
    {
        name: "Figma",
        username:"figma",
        avatar: 'https://ag.digital/qp-content/uploads/2019/08/Group-5.png'
    },
    {
        name: "Adobe XD",
        username:"adobe-xd",
        avatar: 'https://upload.wikimedia.org/wikipedia/common/thumb/c/c2/Adobe_XD_CC_icon.svg/21'
    },
]

export const createParticipantsSeeds =async () => {
    for (const item of participants) {
        await client.participant.upsert({
            where:{
                username: item.username
            },
            create: item,
            update: {}
        })
    }
}