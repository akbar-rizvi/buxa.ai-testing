import {describe,test} from "vitest"
import dotenv from "dotenv"
import ArticleMethod from "../Methods/Article"
import methods from "../Methods"
import { DoocumentTestData } from "../helper/common"
dotenv.config()

export default class ArticleTest{
    static articleUnitTest(){

        describe(`1: Running test case for create article`, () => {
            test("test 1.1 creating  article", async () => {
                await methods.ArticleMethod.createArticle(DoocumentTestData.createDocumentwithValidData) })

            test("test 1.2 creating  article with missing data", async () => {
                await methods.ArticleMethod.createArticleWithMissingData(DoocumentTestData.createDocumentwithInValidData) })
        })
        
  
}
}