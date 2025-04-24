import { describe,test } from "vitest";

import Methods from "../Methods";
import { CarousalDocs } from "../helper/CarousalDocs";


export default class CarousalTest{
    static carousalUnitTest(){
        describe(`1: Running test case for  carousal`, () => {
            
        test(`1.1 testing  for creating carousal`,async()=>{await Methods.CarousalMethod.createCarousalWithMissingData(CarousalDocs.missingFieldsData)   }) 

        test(`1.2 testing  for creating carousal with invalid data types`,async()=>{await Methods.CarousalMethod.createCarousalWithMissingData(CarousalDocs.invalidTypesData)   }) 

        test(`1.3 testing  for creating carousal with No pages`,async()=>{await Methods.CarousalMethod.createCarousalWithMissingData(CarousalDocs.shortNumPagesData)   }) 

        test(`1.4 testing  for creating carousal with single Color InputData`,async()=>{await Methods.CarousalMethod.createCarousalWithMissingData(CarousalDocs.singleColorInputData)   }) 
  
        test(`1.5 testing  for creating carousal with No Color InputData`,async()=>{await Methods.CarousalMethod.createCarousalWithMissingData(CarousalDocs.NoColorInputData)   }) 

        test(`1.5 testing  for creating carousal Empty article input`,async()=>{await Methods.CarousalMethod.createCarousalWithMissingData(CarousalDocs.EmptyArticleData)   }) 

       test(`1.6 testing  for creating with valid data`,async()=>{await Methods.CarousalMethod.createCarousal(CarousalDocs.validArticleData)   }) 

   // ___________________________get history of carousal_________________________________________________________________________________________________________________________
        
        test(`2.1 test for getting all carousal history `,async()=>{await Methods.CarousalMethod.getcarousalHistory()})


    //_________________________get carousal by id_________________________________________________________________________________________________________

       test(`3.1 test for getting carousal by Carousal id`,async()=>{await Methods.CarousalMethod.getCaroudalById(1)})

       test(`3.2 test for getting carousal by Empty id`,async()=>{await Methods.CarousalMethod.getCaroudalByInvalidId(CarousalDocs.carousalId)})

       test(`3.2 test for getting carousal by Invalid id`,async()=>{await Methods.CarousalMethod.getCaroudalByInvalidId("test")})


    //___________________________delete carousal by id_________________________________________________________________________________________________

    test(`4.1 : test for deleting carousal with Id`,async()=>{await Methods.CarousalMethod.deleteCarousalById("1")})

    test(`4.2 : test for deleting carousal with Empty Id`,async()=>{await Methods.CarousalMethod.deleteCarousalByInvalidId("")})

    test(`4.3 : test for deleting carousal with Invalid Id`,async()=>{await Methods.CarousalMethod.deleteCarousalByInvalidId(56)})



       // invalidTypesData
        // describe ends        
        })
     //carousalUnitTest ends   
    }
//CarousalTest ends
}