const {GoogleGenerativeAI} = require('@google/generative-ai');
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
const {removeLastChar} = require('../JpegFileHandler');
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType){
    return {
        inlineData:{
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        },
    };
}

const prompt = "Write a caption for the image provided below. The caption will be used for an Instagram post. The caption should be simple, engaging, and contain relevant hashtags related to the image. The caption should be a single paragraph, within 100 words, without any bullet points or numbered lists. don't make the caption too nerdy ,try to maintian the metaphore or General Logic of the image ( some things are better unsaid yk ) . Also while adding tags , start tags with newline ";

const location  = path.join('' ,'src/Assets/Posted/918875130214117837.jpeg');


async function captionGenerator(imagePath = location,promptRec = ""){
    const promptAI = prompt + promptRec;
    const model = genAI.getGenerativeModel({model:"gemini-pro-vision"});
    const imageParts = [
        // we can prove here 16 multiple images 
        fileToGenerativePart( imagePath , "image/jpeg"),
        // fileToGenerativePart("image.png" , "image/png"),
    ];
    try{
        const result = await model.generateContent([promptAI, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        console.log('\n\tTheTextGeneratedIs : \n' + text);
        return text;
    }catch(err){
        console.log('Error while Generating Prompt' , err);
    }finally{
    }
}


module.exports ={
    captionGenerator
};