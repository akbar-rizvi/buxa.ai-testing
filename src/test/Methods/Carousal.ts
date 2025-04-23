import { expect } from "vitest"
import { fetchData } from "../helper/fetchdata"

import { logSuccess, logError, createLogger } from "../helper/logger";
import { createErrorMessage, extractErrorMessage } from "../helper/common";
import path from "path"
const logger = createLogger(path.join(path.resolve(), "logs/Podcast.log"))



const carousal_api=process.env.CAROUSAL_API

const headers={
    Authorizations:`Bearer ${process.env.TOKEN}`,
    Accept:'Application/json'
}
export default class CarousalMethod{
    static createCarousal=async(data:{})=>{
       try {

        const response=await fetchData(`${carousal_api}/generate-carousal`,"POST",data,Headers)
        const result=response.json()

        if(!response.ok){
            expect(result.status).toBe(false)
            expect(result.sucess).toBe(false)
            logSuccess(logger,`${carousal_api}/generate-carousal}`,result.message,response.status)
             
        }
        
       } catch (error) {
        console.log(error)
        const errorDetails=extractErrorMessage(error)
        logError(logger,`${carousal_api}/generate-carousal}`,errorDetails.message,errorDetails.status)     
        }
        
       }
    


    
}