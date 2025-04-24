import { expect } from "vitest"
import { fetchData } from "../helper/fetchdata"
import dotenv from "dotenv"
dotenv.config()
import { logSuccess, logError, createLogger } from "../helper/logger";
import { createErrorMessage, extractErrorMessage } from "../helper/common";
import path from "path"
import { response } from "express";
const logger = createLogger(path.join(path.resolve(), "logs/carousal.log"))



const carousal_api=process.env.CAROUSAL_API

const token=process.env.TOKEN

const  headers= {
                     
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
}

export default class CarousalMethod{
    static createCarousal=async(data:any)=>{
       try {

        const response=await fetchData(`${carousal_api}/generate-carousal`,"POST",data,headers)
      
        
        console.log("response",response)
        const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);   
            expect(result.message).toBe("carousal generated successfully");

        
       } catch (error) {
        console.log(error)
        const errorDetails=extractErrorMessage(error)
        logError(logger,`${carousal_api}/generate-carousal}`,errorDetails.message,errorDetails.status)     
        }
        
       }

    static createCarousalWithMissingData=async(data:any)=>{
       try {
                   const response = await fetchData(`${carousal_api}`, "POST", data, headers);
                   
                   if (!response.ok) {
                       const result = await response.json();
                       expect(result.success).toBe(false);
                       expect(result.status).toBe(false);
                       
                       const errorDetails = extractErrorMessage(result);
                       logError(logger,`${carousal_api}`, errorDetails.message, errorDetails.status);
                       
                       
                   }
               } catch (error: any) {
                   
                   const errorDetails = extractErrorMessage(error);
                   logError(logger, `${carousal_api}`, errorDetails.message, errorDetails.status);
                   
                  
               }
    }
    static getcarousalHistory=async()=>{
        try {
            const response =await fetchData(`${carousal_api}/carousal-history`,"GET",null,headers)
            const result=await response.json()

            if(!response.ok){
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage); 
            }
            expect(result.status).toBe(true)
            expect(result.message).toBe('All carousal history')

        } catch (error:any) {
            console.log(error.message)
            const errorDetails = extractErrorMessage(error);
            logError(logger, `${carousal_api}`, errorDetails.message, errorDetails.status);
            
            throw new Error()
            
        }
    }

    static getCaroudalById=async(carousalId:any)=>{
        try {
           const response=await fetchData(`${carousal_api}/${carousalId}`,"GET",null,headers)
           const result=await response.json()
           if(!response.ok){
            const errorMessage = result.message || "Authorization failed";
            throw new Error(errorMessage); 
            return
        }

        expect(result.status).toBe(true)
        expect(result.message).toBe('Carousal details')
            
        } catch (error:any) {
            console.log(error.message)
            const errorDetails = extractErrorMessage(error);
            logError(logger, `${carousal_api}`, errorDetails.message, errorDetails.status);
            
            throw new Error()
            
        }
    }
    
    static getCaroudalByInvalidId=async(carousalId:any)=>{
        try {
           const response=await fetchData(`${carousal_api}/${carousalId}`,"GET",null,headers)
           const result=await response.json()
           console.log('result',result)
           if(!response.ok){
            expect(result.status).toBe(false)
            expect(result.success).toBe(false);
            const errorDetails = extractErrorMessage(result);
            logError(logger,`${carousal_api}`, errorDetails.message, errorDetails.status);  
           }        
        } catch (error) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, `${carousal_api}`, errorDetails.message, errorDetails.status);
            
            
        }
    }

    static deleteCarousalById=async(carousalId:any)=>{
        try {
            const response=await fetchData(`${carousal_api}/${carousalId}`,"DELETE",null,headers)
            const result=await response.json()
            if(!response.ok){
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage); 
                return
            }
    
            expect(result.status).toBe(true)
            expect(result.message).toBe('Carousal deleted successfully')

            
        } catch (error:any) {
            console.log(error.message)
            const errorDetails = extractErrorMessage(error);
            logError(logger, `${carousal_api}`, errorDetails.message, errorDetails.status);
            
            throw new Error(errorDetails)
            
        }
    }

    static deleteCarousalByInvalidId=async(carousalId:any)=>{
        try {
           const response=await fetchData(`${carousal_api}/${carousalId}`,"GET",null,headers)
           const result=await response.json()
           
           if(!response.ok){
            expect(result.status).toBe(false)
            expect(result.success).toBe(false);
            const errorDetails = extractErrorMessage(result);
            logError(logger,`${carousal_api}`, errorDetails.message, errorDetails.status);  

           }        
        } catch (error) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, `${carousal_api}`, errorDetails.message, errorDetails.status);
            
            
        }
    }


    
}