import { Request, Response } from 'express';
import client from '../config/client';

export class GetGamesController{
    async  handle(req: Request, res: Response){
        
        try{
            const games = await client.game.findMany({
                orderBy:{
                    createdAt: "desc"
                },
                include: {
                    gameParticipants:{
                        include:{
                            game:true,
                            participant:true,
                            votes:true,
                        }
                    }
                }
            });

            const gameView = games.map(item =>{
                const totalVotes = item.gameParticipants.reduce((acc, curr)=>{
                    return acc + curr.votes.length
                },0)
                return {
                    ...item,
                    gameParticipants:item.gameParticipants.map(itemParicipants =>{
                        return {
                            participant: itemParicipants.participant,
                            vote: itemParicipants.votes.length,
                            percent: totalVotes > 0 ? ((itemParicipants.votes.length / totalVotes)*100):0
                        }
                    })
                }
            })
            return res.json(gameView);
        }catch(error){
            return res.status(500).json({message: 'Erro interno no servidor: '+error})
        }

    }
}