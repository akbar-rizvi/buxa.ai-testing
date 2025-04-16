
import "dotenv/config";
import { expect,expectTypeOf } from "vitest";
import { logSuccess, logError, createLogger } from "../helper/logger";
import { createErrorMessage, extractErrorMessage } from "../helper/common";

import { fetchData } from "../helper/fetchdata";

import path from "path";






const logger = createLogger(path.join(path.resolve(), "logs/Article.log"))

const token=process.env.TOKEN
const article_api=process.env.ARTICLE_API
const  headers= {
                     
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
}

export default class ArticleMethod{

    static createArticle=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}`, "POST", data,headers);
            

            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);
            expect(result.message).toBe("Document Created Successfully");

            logSuccess(logger, "/create-article", result.message, response.status);
        } catch (error: any) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/create-article", errorDetails.message, errorDetails.status);
            throw error;
        }
    }

    static createArticleWithMissingData = async (data: any) => {
        try {
            const response = await fetchData(`${article_api}`, "POST", data, headers);
            
           
            if (!response.ok) {
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);
                
                const errorDetails = extractErrorMessage(result);
                logError(logger, "/create-article", errorDetails.message, errorDetails.status);
                
                
            }
    
            // If response is successful but shouldn't be (e.g., missing data)
            const result = await response.json();
            throw new Error("Expected request to fail, but it succeeded.");
    
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/create-article", errorDetails.message, errorDetails.status);
            
           
        }
    };

    static updateArticle=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "PATCH", data,headers);
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);
            expect(result.message).toBe("Document Updated Successfully");

            logSuccess(logger, "/documents/:documentId", result.message, response.status);
        } catch (error: any) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/documents/:documentId", errorDetails.message, errorDetails.status);
            throw error;
        }
    }
    static updateArticleWithoutContent=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "PATCH", data,headers);
            if (!response.ok) {
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);
                
                const errorDetails = extractErrorMessage(result);
                logError(logger, "/documents/:documentId", errorDetails.message, errorDetails.status);
                
                
            }
    
            // If response is successful but shouldn't be (e.g., missing data)
            const result = await response.json();
            throw new Error("Expected request to fail, but it succeeded.");
    
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/documents/:documentId", errorDetails.message, errorDetails.status);
            
           
        }
    }
    static updateArticleWithoutDocumentId=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "PATCH", data,headers);
            if (!response.ok) {
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);
                
                const errorDetails = extractErrorMessage(result);
                logError(logger, "/documents/:documentId", errorDetails.message, errorDetails.status);
                
                
            }
    
            // If response is successful but shouldn't be (e.g., missing data)
            const result = await response.json();
            throw new Error("Expected request to fail, but it succeeded.");
    
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/documents/:documentId", errorDetails.message, errorDetails.status);
            
           
        }
    }
    
}