import {describe,test} from "vitest"
import dotenv from "dotenv"

import methods from "../Methods"
import { DocumentTestData } from "../helper/common"
import { PodcastTestData } from "../helper/PodcastTestData"
dotenv.config()


export default class PodcastTest{
    static podcastUnitTest(){ 

        describe(`1: Running test case for  podcast`, () => {

            //--------------------generating posdcast transcript-----------------------------------

           test("test 1.1 creating  podcast with missing podcast name", async () => {await methods.PodcastMethod.createPodcastwithMissingData(PodcastTestData.missingPodcastname ) })

           test("test 1.2 creating  podcast with empty podcast name", async () => {await methods.PodcastMethod.createPodcastwithMissingData(PodcastTestData.EmptyPodcastname ) })

           test("test 1.3 creating  podcast with missing Content", async () => {await methods.PodcastMethod.createPodcastwithMissingData(PodcastTestData.missingContent ) })

           test("test 1.4 creating  podcast with missing podcastType", async () => {await methods.PodcastMethod.createPodcastwithMissingData(PodcastTestData.missingPodcastType ) })

           test("test 1.5 creating  podcast with empty podcastType", async () => {await methods.PodcastMethod.createPodcastwithMissingData(PodcastTestData.EmptyPodcastType ) })

           test("test 1.6 creating  podcast with valid data", async () => {await methods.PodcastMethod.createPodcastwithMissingData(PodcastTestData.podcastWithValiddata ) })
           

           // ---------------getting all Podcast History------------------------------------

           test(`test 2.1 get all podcast transcript`,async()=>{ await methods.PodcastMethod.getAllPodcast() })

        //-----------getting individual podcast By Id--------------------------------------

        test(`3.1 get podcast by id`,async()=>{await methods.PodcastMethod.getPodacstById(DocumentTestData.Podcastid) })

        test(`3.2 get podcast with Invalid id`,async()=>{await methods.PodcastMethod.getPodacstByIdwithInvalid(DocumentTestData.InvalidPodcastId) })

        test(`3.3 get podcast with Empty Id`,async()=>{await methods.PodcastMethod.getPodacstByIdwithInvalid(DocumentTestData.EmptyPodcastId) })
            
            
        //----------generating audio for podcast script-----------------------------------

        test(`4.1 generating podcast audio without content`,async()=>{await methods.PodcastMethod.getPodcastAudiowithInvalidDetails(DocumentTestData.GenerateAudiowithoutContent,"RO1OFHQI") })

        test(`4.2 generating podcast audio with Empty content`,async()=>{await methods.PodcastMethod.getPodcastAudiowithInvalidDetails(DocumentTestData.GenerateAudiowithEmptyContent,"RO1OFHQI") })
           
        test(`4.3 generating podcast audio without person-1 audio`,async()=>{await methods.PodcastMethod.getPodcastAudiowithInvalidDetails(DocumentTestData.GenerateAudiowithoutPerson1,"RO1OFHQI") })

        test(`4.4 generating podcast audio without person-2 audio`,async()=>{await methods.PodcastMethod.getPodcastAudiowithInvalidDetails(DocumentTestData.GenerateAudiowithoutPerson2,"RO1OFHQI") })

        test(`4.5 generating podcast audio with Empty podcastId`,async()=>{await methods.PodcastMethod.getPodcastAudiowithInvalidDetails(DocumentTestData.GenerateAudiowithoutPerson2,"") })

        test(`4.6 generating podcast with valid data`,async()=>{await methods.PodcastMethod.getPodcastAudio(DocumentTestData.GenerateAudio,"RO1OFHQI") })
       

            
        })
        
    }
}