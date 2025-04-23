import {describe,test} from "vitest"
import dotenv from "dotenv"
import ArticleMethod from "../Methods/Article"
import methods from "../Methods"
import { DocumentTestData } from "../helper/common"
dotenv.config()

export default class ArticleTest{
    static articleUnitTest(){

        describe(`1: Running test case for  article`, () => {
            test("test 1.1 creating  article", async () => {
                await methods.ArticleMethod.createArticle(DocumentTestData.createDocumentwithValidData) })

            test("test 1.2 creating  article with missing data", async () => {
                await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.createDocumentwithInValidData) })


            // //------------update article----------------------------------------------------//    
            // test("test 1.3 updating in user's article", async () => {
            //     await methods.ArticleMethod.updateArticle(DocumentTestData.updateDocumentwithValidData)})

           
            // test("test 1.4 updating in user's article without content", async () => {
            //     await methods.ArticleMethod.updateArticleWithoutContent(DocumentTestData.updateDocumentwithInValidData)})

            // test("test 1.5 updating in user's article without documentId", async () => {
            //     await methods.ArticleMethod.updateArticleWithoutDocumentId(DocumentTestData.updateDocumentwithOutDocumentId)})
        
            // //--------------------history of users's Article------------------------------------------//
            // test("test 1.6 getting history of user's article", async () => {
            //     await methods.ArticleMethod.historyOfUser()
            // })

            // ////-------------------get Article by userId------------------------------------------------//

            // test("test 1.7 getting article by documentId", async () => {
            //     await methods.ArticleMethod.getArticleByUserId(DocumentTestData.getArticleBydocumentId)
            // })

            // test("test 1.8 getting article without documentId", async () => {
            //     await methods.ArticleMethod.getArticleWithoutDocumentId(DocumentTestData.getArticleWithoutdocumentId)})
        
            // //----------------//upload images to articles---------------------//image upload not working
            // // test("test 1.9 uploading image to article", async () => {
            // //     await methods.ArticleMethod.uploadImageToArticle(DocumentTestData.uploadImageToArticle)})
        

})
}
}