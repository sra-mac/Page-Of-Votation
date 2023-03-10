import { Request, Response } from 'express';
import client from '../config/client';

export class FinalizeGameController{
    async  handle(req: Request, res: Response){
        const {id} = req.params
        try{
            const gameExists = await client.game.findFirst({
                where:{
                    id,
                    isActive:true
                },
                include:{
                    gameParticipants:{
                        include:{
                            participant:true,
                            votes: true
                        }
                    }
                }
            })
            if(!gameExists){
                return res.status(404).json({message: 'O game não existe.'})
            }
            const participants = gameExists.gameParticipants.map(gameParticipants =>{
                return{
                    participantId: gameParticipants.participant.id,
                    votes: gameParticipants.votes.length
                }
            })

            const eliminatedParticipant = participants.reduce((previous, current)=>{
                return current.votes > previous.votes ? current:previous
            })

            await client.$transaction(async transaction =>{
                await transaction.game.update({
                    where:{
                        id: gameExists.id
                    },
                    data:{
                        isActive:false
                    }
                })
                await transaction.participant.update({
                    where:{
                        id: eliminatedParticipant.participantId
                    },
                    data:{
                        eliminated:true
                    }
                })
            }) 

            return res.status(204).send()

        }catch(error){
            return res.status(500).json({message: 'Erro interno no servidor.'})
        }

    }
}