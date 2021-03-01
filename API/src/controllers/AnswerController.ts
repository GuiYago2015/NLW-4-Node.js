import { getCustomRepository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import {Request, Response} from "express";
import { AppError } from "../errors/AppError";


class AnswerController{


    //http://localhost:3333/answers/7?u=ca3eb8e2-a9f2-4744-84a3-745ebc21475c
    /**
     *  Route Params => Parametros que compôem a rota
     * routes.get("/answers/:value")
     * 
     * Query Params => Busca, Paginação - não obrigatórios
     * ?
     * chave=valor
     */


    async execute(request: Request, response: Response){
        const {value} = request.params;
        const {u} = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError( "Survey User does not exists!");
        }

        surveyUser.value = Number(value); 

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export {AnswerController}