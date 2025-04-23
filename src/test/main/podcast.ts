import {describe,test} from "vitest"
import dotenv from "dotenv"

import methods from "../Methods"
import { DocumentTestData } from "../helper/common"
dotenv.config()


export default class PodcastTest{
    static podcastUnitTest(){ 
        describe(`1: Running test case for  podcast`, () => {
            test("test 1.1 creating  podcast", async () => {
                await methods.PodcastMethod.createPodcast(DocumentTestData.createpodcast)
            })

            test("test 1.2 creating  podcast with missing data", async () => {
                await methods.PodcastMethod.createPodcastwithMissingData(DocumentTestData.createpodcastwithInValidData)
            })

            test(`test 1.3: get all podcast transcript`,async()=>{
                await methods.PodcastMethod.getAllPodcast()
            })

            test(`test 1.4 get podcast by id`,async()=>{
                await methods.PodcastMethod.getPodacstById(DocumentTestData.Podcastid.Podcastid)
            })

            test(`test 1.5 get podcast with Invalid id`,async()=>{
                await methods.PodcastMethod.getPodacstByIdwithInvalid(DocumentTestData.InvalidPodcastId.podcastid)
            })

            test(`test 1.6 genearte podcast audio with valid PodcastId`,async()=>{
                await methods.PodcastMethod.getPodcastAudio(DocumentTestData.GenerateAudio,"RO1OFHQI")
            })

            test(`test 1.7 genearte podcast audio with Invalid PodcastId`,async()=>{
                await methods.PodcastMethod.getPodcastAudiowithInvalidDetails(DocumentTestData.generatewithMissingdata,23)
            })
        })
      }
    
}