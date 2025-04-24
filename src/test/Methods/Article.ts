
import "dotenv/config";
import { expect,expectTypeOf } from "vitest";
import { logSuccess, logError, createLogger } from "../helper/logger";
import { createErrorMessage, extractErrorMessage } from "../helper/common";
import fs from "fs";
import FormData from "form-data";
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
    static historyOfUser=async ()=>{
        try {
            const response = await fetchData(`${article_api}/articlehistory`, "GET", null, headers);
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);
            expect(result.message).toBe("All documents fetched");   

            logSuccess(logger, "/articlehistory", result.message, response.status);
        } catch (error: any) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/articlehistory", errorDetails.message, errorDetails.status);
            throw error;    
        }
    }
    static getArticleByUserId=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "GET", null, headers);
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);
            expect(result.message).toBe("Get Document Successfully");

            logSuccess(logger, "/articlehistory", result.message, response.status);
        } catch (error: any) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/articlehistory", errorDetails.message, errorDetails.status);
            throw error;
        }
    }
    static getArticleWithoutDocumentId=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "GET", null, headers);
            if (!response.ok) {
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);
                
                const errorDetails = extractErrorMessage(result);
                logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
                
                
            }
    
            // If response is successful but shouldn't be (e.g., missing data)
            const result = await response.json();
            throw new Error("Expected request to fail, but it succeeded.");
    
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
            
           
        }
    }
    static uploadImageToArticle=async (data:any)=>{
        try {
            console.log("data",data.documentId,data.image)
            if (!fs.existsSync(data.img)) {
                throw new Error(`Image not found at: ${data.toString()}`);
              }

            const form = new FormData();
            form.append("image", fs.createReadStream(data.image));

            const finalHeaders = {
                ...headers,
                ...form.getHeaders(), 
              };

            const response = await fetchData(`${article_api}/uploadImage/${data.documentId}`, "PATCH", form, finalHeaders);
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);   
            expect(result.message).toBe("Image uploaded successfully");

            logSuccess(logger, "/uploadimage/:documentId", result.message, response.status);
        } catch (error: any) {
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/uploadimage/:documentId", errorDetails.message, errorDetails.status);
            throw error;    
        }
    }
    static getArticleByInvalidUserId=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "GET", null, headers);
            if (!response.ok) {
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);
                
                const errorDetails = extractErrorMessage(result);
                logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
                
                
            }
    
            // If response is successful but shouldn't be (e.g., missing data)
            const result = await response.json();
            throw new Error("Expected request to fail, but it succeeded.");
    
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
            
           
        }
    }

    static DeleteArticleWithDocumentId=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "DELETE", null, headers);
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.message || "Authorization failed";
                throw new Error(errorMessage);
            }
            expect(result.status).toBe(true);   
            expect(result.message).toBe("Image uploaded successfully");

    
    
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
            
           
        }
    }
    static deleteArticleByInvalidUserId=async (data:any)=>{
        try {
            const response = await fetchData(`${article_api}/${data.documentId}`, "DELETE", null, headers);
            if (!response.ok) {
                const result = await response.json();
                expect(result.success).toBe(false);
                expect(result.status).toBe(false);
                
                const errorDetails = extractErrorMessage(result);
                logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
                
                
            }
        } catch (error: any) {
            
            const errorDetails = extractErrorMessage(error);
            logError(logger, "/:documentId", errorDetails.message, errorDetails.status);
            
           
        }
    }
    
}