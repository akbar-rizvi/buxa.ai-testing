import { describe,test } from "node:test";
import { DocumentTestData } from "../helper/common";
import Methods from "../Methods";


export default class CarousalTest{
    static carousalUnitTest(){
        describe(`1: Running test case for  carousal`, () => {
            test(`1.1 test case for creating carousal`,async()=>{
                await Methods.CarousalMethod.createCarousal(DocumentTestData.createCarouslWithMissing)   }) 
        
            
        })
        
    }

}