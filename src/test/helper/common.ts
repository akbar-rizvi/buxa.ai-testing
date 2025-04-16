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
  

export const DoocumentTestData={
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
 
}