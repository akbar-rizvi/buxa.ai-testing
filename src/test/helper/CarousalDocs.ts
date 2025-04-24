

export const CarousalDocs={
     validArticleData :{
        article_input: "Artificial Intelligence (AI) is transforming the way we live and work. From self-driving cars to advanced language models, AI is increasingly being integrated into everyday technologies. Businesses are leveraging AI to automate tasks, enhance customer service, and gain insights from data. As this technology continues to evolve, it also raises important ethical and societal questions about privacy, employment, and decision-making. The future of AI will depend on how responsibly and creatively we develop and apply these innovations.",
        num_pages: "2",
        color_palette_type: "MANUAL",
        color_palette_input: ["#FF5733", "#FFC300"],
        include_images: true,
        font_style: "serif",
        brand_name: "the Wasserstoff pvt ltd"
      },
      EmptyArticleData :{
        article_input: "",
        num_pages: "5",
        color_palette_type: "warm",
        color_palette_input: ["#FF5733", "#FFC300"],
        include_images: true,
        font_style: "serif",
        brand_name: "MyBrand"
      },

       missingFieldsData :{
        // article_input is missing
        num_pages: "3",
        color_palette_type: "cool",
        color_palette_input: "#333333",
        include_images: "true",
        font_style: "sans-serif"
      },

       invalidTypesData:{
        article_input: 12345,  // should be string
        num_pages: 2,  // should be string
        color_palette_type: false,  // should be string
        color_palette_input: 123,  // should be string or array of strings
        include_images: "maybe",  // not 'true' or 'false' or boolean
        font_style: null  // should be string
      },
       shortNumPagesData :{
        article_input: "Edge case test",
        num_pages: "",  // min(1) violation
        color_palette_type: "neutral",
        color_palette_input: "#FFFFFF",
        include_images: false,
        font_style: "monospace"
      },

       singleColorInputData :{
        article_input: "Single string color test",
        num_pages: "10",
        color_palette_type: "vivid",
        color_palette_input: "#000000",  // valid as string
        include_images: "false",
        font_style: "cursive"
      },

      NoColorInputData :{
        article_input: "Single string color test",
        num_pages: "10",
        color_palette_type: "vivid",
        color_palette_input: "",  // valid as string
        include_images: "false",
        font_style: "cursive"
      },
      carousalId:{
        
      }
      
      
      
      
      

}