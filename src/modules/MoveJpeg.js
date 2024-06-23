const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const posted = path.resolve('src/Assets/Posted');

async function moveJpeg(jpegPath){
    const filePath = jpegPath;
    await console.log('\tStarting File Moving Execution');
    try{
        const destinationDriPath = posted;
        const destinationPath = await path.join(destinationDriPath,path.basename(jpegPath))
        await fs.rename(jpegPath , destinationPath,(err)=>{
            if(err) throw err;
            console.log('Files moved to Posted Directory');
        })
    }
    catch(err){
        console.log('error found ' , err);
    }
} 

module.exports = moveJpeg;