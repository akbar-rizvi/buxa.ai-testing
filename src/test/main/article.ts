import {describe,test} from "vitest"
import dotenv from "dotenv"
import ArticleMethod from "../Methods/Article"
import methods from "../Methods"
import { DocumentTestData } from "../helper/common"
dotenv.config()

export default class ArticleTest{
    static articleUnitTest(){

        describe(`1: Running test case for create article`, () => {
            test("test 1.1 creating  article", async () => {
                await methods.ArticleMethod.createArticle(DocumentTestData.createDocumentwithValidData) })

            test("test 1.2 creating  article with missing data", async () => {
                await methods.ArticleMethod.createArticleWithMissingData(DocumentTestData.createDocumentwithInValidData) })

            test("test 1.3 updating in user's article", async () => {
                await methods.ArticleMethod.updateArticle(DocumentTestData.updateDocumentwithValidData)})

           
            test("test 1.4 updating in user's article without content", async () => {
                await methods.ArticleMethod.updateArticleWithoutContent(DocumentTestData.updateDocumentwithInValidData)})

            test("test 1.5 updating in user's article without documentId", async () => {
                await methods.ArticleMethod.updateArticleWithoutDocumentId(DocumentTestData.updateDocumentwithOutDocumentId)})
        
        
 
        

})
}
}