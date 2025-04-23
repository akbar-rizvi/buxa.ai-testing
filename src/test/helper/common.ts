import path from "path";
import fs from "fs"

export const createErrorMessage = (result: any, resStatus: number) => {
    const errorMessage = result.errors
      ? JSON.stringify(result.errors)
      : JSON.stringify(result.message);
    return JSON.stringify({ message: errorMessage, status: resStatus });
  };
  
  // export const extractErrorMessage = (error: any) => {
  //   console.log(error);
  //   return error.message ? JSON.parse(error.message) : { message: "Unexpected error", status: -1 };
  // };

  export const extractErrorMessage = (error: any) => {
    try {
      return error.message && error.message.startsWith('{')
        ? JSON.parse(error.message)
        : { message: error.message || "Unexpected error", status: -1 };
    } catch (err) {
      return { message: error.message || "Unexpected error", status: -1 };
    }
  };
  

export const DocumentTestData={
   createDocumentwithValidData:{
    metadata: {
      title: "Impact on job from Ai revolution",
      researchLevel: 3,
      personality: ["professional", "insightful"],
      tone: "Informative",
      language: "English",
      useCase: "Educational article"
    }
   }
,
   createDocumentwithInValidData:{
    metadata: {
      researchLevel: 2,
      personality: ["funny"],
      tone: "Casual",
    }

   }
  ,
   updateDocumentwithValidData:{
    documentId:10,
    content:"testing content to be updated 2"
 
}
,
updateDocumentwithInValidData:{
    documentId:10,
    content:""
}
,
updateDocumentwithOutDocumentId:{
    content:"testing content to be updated 2"
}
,
getArticleBydocumentId:{
  documentId:10
}
,
getArticleWithoutdocumentId:{

}
,
uploadImageToArticle:{
  documentId:10,
  image: path.join( "src", "test", "helper", "ImageFolder", "img1.jpg")
},

createpodcast:{
  "podCastName": "Voices of the Street",
  "Content": "Let's talk about how digital payments are transforming the lives of local vendors and small businesses.",
  "podcastType": "CohostPod",
  "person1Name": "Alexa",
  "person1Personality": "Bold & Spiritual",
  "person2Name": "Siri",
  "person2Personality": "Witty & Sarcastic",
  "tone": "Conversational",
  "soundEffects": true
}
,

createpodcastwithInValidData:{
  "podCastName": "",
  "Content": "",
  "podcastType": "CohostPod",
  "person1Name": "",
  "person1Personality": "Bold & Spiritual",
  "person2Name": "Siri",
  "person2Personality": "Witty & Sarcastic",
  "tone": "Conversational",
  "soundEffects": true

},
Podcastid:{
  Podcastid:3

},
InvalidPodcastId:{
  podcastid:'test'
},
GenerateAudio:{
  "content":"Person1: Hey everyone, and welcome back to [Podcast Name]! I'm Alexa, your resident cosmic guide, ready to explore the universe of… well, today, it's the universe of small business!Person2: And I'm Siri, here to ground Alexa's flights of fancy with a healthy dose of cynicism and, you know, actual facts. Get ready folks, it's about to get *real* digital in here.Person1: Today, we're diving into how digital payments are transforming the lives of our local vendors and small businesses. Think food trucks, artisanal shops, that amazing vintage bookstore you love…Person2: …Places where you used to have to awkwardly scramble for cash like it's 1995. We're talking about the death of the Sorry, cash only sign. Rejoice!Person1: We'll be exploring the convenience, the opportunities, and maybe even a little bit of the *energy* that digital payments bring to our communities. Buckle up, because we’re about to witness a financial awakening!Person2: Or at least, a slightly less painful way to buy overpriced coffee. Let’s get started. So, Alexa, let's kick things off. How have digital payments *really* made life easier for both vendors and us, the ever-suffering customers?Person1: Oh",
      "person1audio":"Jessica",
       "person2audio":"Will"
}
,
generatewithMissingdata:{
  "content":"",
  "person1audio":"",
  "person2audio":""
}
,
createCarousal:{
  "article_input": "As climate change accelerates, 2025 sees a surge in green tech innovations, urban farming initiatives, and eco-conscious consumer behavior reshaping industries.",
  "num_pages": 3,
  "color_palette_type": "MANUAL",
  "color_palette_input": ["#2E8B57", "#A9DFBF", "#145A32"],
  "include_images": "true",
  "font_style": "Sans-serif",
  "brand_name": "EcoShift"
}
,
createCarouslWithMissing:
  {
    "article_input": "",
    "num_pages": "",
    "color_palette_type": "",
    "color_palette_input": [],
    "include_images": "",
    "font_style": "",
    "brand_name": ""
  }
  






}
