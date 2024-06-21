const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const downloadDir = path.resolve('src/Assets/Downloads');

async function JpegFilePath(){
    const dirPath = downloadDir;
    let JpegFileP = null;
    try{
        const files = await fsp.readdir(dirPath);

        for(let file of files){
            let ext = path.extname(file).toLowerCase();
            if(ext === '.jpeg'){
                JpegFileP = path.join(dirPath,file);
                console.log('JPEG file found ', JpegFileP );
                return JpegFileP
            }
            else if( ext === ''){
                let odlFP = path.join(dirPath,file);
                let newFP = path.join(dirPath, "a.jpeg");
                await fsp.rename(odlFP,newFP);
                JpegFileP = await newFP 
                console.log("Jpeg File recreated : " , JpegFileP );
                return JpegFileP;
            }
        }
        return JpegFilePath;
    }
    catch(err){
        console.log('error found ' , err);
    }
} 

module.exports = JpegFilePath;