import {describe,test} from "vitest"
import dotenv from "dotenv"
import ArticleMethod from "../Methods/Article"
import methods from "../Methods"
import { DocumentTestData } from "../helper/common"
dotenv.config()

export default class ArticleTest{
    static articleUnitTest(){

        describe(`1: Running test case for  article`, () => {
           test("test 1.1 creating  article", async () => {await methods.ArticleMethod.createArticle(DocumentTestData.createDocumentwithValidData) })

        //     test("test 1.2  should fail while creating article with missing data", async () => { await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.createDocumentwithInValidData) })
            
        //     test(`test 1.3: should fail while testing for missing metaData`,async()=>{await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.missingData)})

        //     test(`test 1.4: should fail while testing for missing title`,async()=>{await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.missingTitle)})

        //     test(`test 1.5: should fail while testing for  missing Personality`,async()=>{await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.missingPersonality)})

        //     test(`test 1.6: should fail for passing string instead of array in Personality`,async()=>{await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.missingPersonalityString)})

        //     test(`test 1.7: should fail for passing Empty array in Personality`,async()=>{await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.EmptyArrayPersonality)})

        //     test(`test 1.8 : should fail for not passing boolean for deepdive`,async()=>{await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.missingDeepdive)}) 

          test(`test 1.9 : testing to create article for deepdive true `,async()=>{await methods.ArticleMethod.createArticle(DocumentTestData.createDocumentwithValidDataforDeepdive)})



            // //------------update article----------------------------------------------------//    
            // test("test 2.0 updating in user's article", async () => { await methods.ArticleMethod.updateArticle(DocumentTestData.updateDocumentwithValidData)})

            // test(`test 2.1 updating article with missing data`,async()=>{await methods.ArticleMethod.updateArticleWithoutContent(DocumentTestData.updateDocumentwithInValidData)})

            // test(`test 2.2 updating article with missing documentId`,async()=>{await methods.ArticleMethod.updateArticleWithoutContent(DocumentTestData.updateDocumentwithOutDocumentId)})

            // test(`test 2.3 updating article with missing content`,async()=>{await methods.ArticleMethod.updateArticleWithoutContent(DocumentTestData.updateDocumentwithOutContent)})

            // test(`test 2.4 updating article with invalid Id`,async()=>{await methods.ArticleMethod.updateArticleWithoutContent(DocumentTestData.updateDocumentwithInvalidId)})

           
           
            // //--------------------history of users's Article------------------------------------------//
           // test("test 3.1 getting history of user's article", async () => {  await methods.ArticleMethod.historyOfUser()})

              
            

            // ////-------------------get Article by userId------------------------------------------------//

            // test("test 4.1 getting article by documentId", async () => {await methods.ArticleMethod.getArticleByUserId(DocumentTestData.getArticleBydocumentId)})

            // test("test 4.2 getting article by invalid documentId", async () => {await methods.ArticleMethod.getArticleByInvalidUserId(DocumentTestData.getArticleByInvaliddocumentId)})

            // test("test 4.3 getting article by empty documentId", async () => {await methods.ArticleMethod.getArticleByInvalidUserId(DocumentTestData.getArticleByEmptydocumentId)})
                
            
            // //---------------delete article by documentId------------------------//
            // test("test 5.1 deleting article with documentId", async () => {await methods.ArticleMethod.DeleteArticleWithDocumentId(DocumentTestData.getArticleBydocumentId)})
                
                
            // test("test 5.2 deleting article by invalid documentId", async () => {await methods.ArticleMethod.deleteArticleByInvalidUserId(DocumentTestData.getArticleByInvaliddocumentId)})
                
            // test("test 5.3 deleting article by empty documentId", async () => {await methods.ArticleMethod.deleteArticleByInvalidUserId(DocumentTestData.getArticleByEmptydocumentId)})
          

})
}
}