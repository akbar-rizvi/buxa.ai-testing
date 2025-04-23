import "dotenv/config";
import { expect,expectTypeOf } from "vitest";
import { logSuccess, logError, createLogger } from "../helper/logger";
import { createErrorMessage, extractErrorMessage } from "../helper/common";

import { fetchData } from "../helper/fetchdata";

import path from "path";

const logger = createLogger(path.join(path.resolve(), "logs/Podcast.log"))

const token=process.env.TOKEN
const podcast_api=process.env.PODCAST_API
const  headers= {
                     
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
}

export default class PodcastMethod{
    static createPodcast=async(data:any)=>{
        try{
            const response=await fetchData(`${podcast_api}/transcript`, "POST",data,headers)
            const result=await response.json()
          
             
            
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);
            expect(result.message).toBe("Summary Created");
            logSuccess(logger,`${podcast_api}/transcript`,result.message,response.status)

        }catch(error:any){
            const errorDetails=extractErrorMessage(error)
            logError(logger,`${podcast_api}/transcript`,errorDetails.message,errorDetails.status)     
            }

    }

    static createPodcastwithMissingData=async(data:any)=>{
        try{
            const response=await fetchData(`${podcast_api}/transcript`, "POST",data,headers)
            const result=await response.json()
          
             
            
              if(!response.ok){
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);

                const errorDetails = extractErrorMessage(result);
                logError(logger,`${podcast_api}/transcript` , errorDetails.message, errorDetails.status);
              }
            
            

        }catch(error:any){
            const errorDetails=extractErrorMessage(error)
            logError(logger,`${podcast_api}/transcript`,errorDetails.message,errorDetails.status)   


        }

    }

    static getAllPodcast=async()=>{
        try {
            const response=await fetchData(`${podcast_api}/alltranscript`,'GET',null,headers)
            const result= await response.json()
            
            if(!response.ok){
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);

            }
            expect(result.success).toBe("true")
            expect(result.message).toBe("All transcript data")
            logSuccess(logger,`${podcast_api}/alltranscript`,result.message,response.status)
            
        } catch (error:any) {
            const errorDetails=extractErrorMessage(error)
            logError(logger,`${podcast_api}/alltranscript`,errorDetails.message,errorDetails.status)   


            
        }
    }
    static getPodacstById=async(PodcastId:number)=>{
        try {
            const response=await fetchData(`${podcast_api}/${PodcastId}`,'GET',PodcastId,headers)
            const result=await response.json()

            if(!response.ok){
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);

            }
            expect(result.status).toBe(true)
            expect(result.message).toBe('detailed Transcript')
            logSuccess(logger,`${podcast_api}/${PodcastId}`,result.message,response.status)
        } catch (error) {
            const errorDetails=extractErrorMessage(error)
            logError(logger,`${podcast_api}/alltranscript`,errorDetails.message,errorDetails.status)   
 
            
        }
        
    }
    static getPodacstByIdwithInvalid=async(Podcastid:any)=>{
       try {
        const response=await fetchData(`${podcast_api}/${Podcastid}`,"GET",Podcastid,headers)
        const result=response.json()

        if(!response.ok){
            expect(result.status).toBe(false)
            expect(result.success).toBe(false)
            logSuccess(logger,`${podcast_api}/${Podcastid}`,result.message,response.status)
        }
        
       } catch (error) {
        const errorDetails=extractErrorMessage(error)
        logError(logger,`${podcast_api}/${Podcastid}`,errorDetails.message,errorDetails.status)   

        
        
       }
    }
    static getPodcastAudio=async(data:{content:string,person1audio:string,person2audio:string},podcastId:string)=>{
       try {
        const response=await fetchData(`${podcast_api}/audio/${podcastId}`,'POST',data,headers) 
       
        const result=await response.json()
        console.log('resp',result) 
        if(!response.ok){
            console.log('test in audio')
            const errorMessage = result.message || "Authorization failed";
            throw new Error(errorMessage);
            

        }
        expect(result.status).toBe(true)
        expect(result.message).toBe('Inserted Podcast Data')
        logSuccess(logger,`${podcast_api}/audio/${podcastId}`,result.message,response.status)
        
       } catch (error) {
        const errorDetails = extractErrorMessage(error);
        throw error;
        
      }
      

    }

    static getPodcastAudiowithInvalidDetails=async(data:{content:string,person1audio:string,person2audio:string},podcastId:number)=>{
        try {
         const response=await fetchData(`${podcast_api}/audio/${podcastId}`,'POST',data,headers) 
         
         const result=await response.json()
         
         
         if(!response.ok){
             expect(result.message).toBe("Invalid details")
             expect(result.status).toBe(false)
             logSuccess(logger,`${podcast_api}/audio/${podcastId}`,result.message,response.status)
     
         }
        

         
        } catch (error) {
         const errorDetails = extractErrorMessage(error);
         logError(logger,`${podcast_api}/audio/${podcastId}`,errorDetails.message,errorDetails.status)
         throw error;
         
       }
       
   
     }      

}