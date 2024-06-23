const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const downloadDir = path.resolve('src/Assets/Downloads');
const posted = path.resolve('src/Assets/Posted');

async function jpegFilePath(namefile){
    const dirPath = downloadDir;
    let JpegFileP = null;
    try{
        const files = await fsp.readdir(dirPath);

        for(let file of files){
            let ext = path.extname(file).toLowerCase();
            if(ext === '.jpeg'){
                JpegFileP =  await path.join(dirPath,file);
                await console.log('\tJPEG file found ', JpegFileP );
                return renameJpegFile(namefile , JpegFileP); 
            }
            else if( ext === ''){
                let odlFP = path.join(dirPath,file);
                let newFP = path.join(dirPath, namefile + '.jpeg');
                await fsp.rename(odlFP,newFP);
                JpegFileP = await newFP 
                await console.log("\tJpeg File recreated : " , JpegFileP );
                return JpegFileP
            }
        }
        return JpegFilePath;
    }
    catch(err){
        console.log('error found ' , err);
    }
} 

async function renameJpegFile(name, filePath) {
    try {
        const dir = path.dirname(filePath);
        const ext = path.extname(filePath);

        const newFilePath = path.join(dir, `${name}${ext}`);

        // Rename the file
        await fsp.rename(filePath , newFilePath,(err)=>{
            if(err) throw err;
            console.log('\tFiles renamed sucessfully');
        })
        await console.log('File Renamed to :' + name+ext)
        return newFilePath;
    } catch (error) {
        console.error('Error renaming file:', error);
        throw error;
        
    }
}


async function moveJpegFile(jpegPath){
    const filePath = jpegPath;
    await console.log('\tStarting File Moving Execution');
    try{
        const destinationDriPath = posted;
        const destinationPath = await path.join(destinationDriPath,path.basename(jpegPath))
        await fs.rename(jpegPath , destinationPath,(err)=>{
            if(err) throw err;
            console.log('\tFiles moved to Posted Directory');
        })
    }
    catch(err){
        console.log('error found ' , err);
    }
} 

async function removeLastChar(str) {
    if(str.length > 0) {
        return str.slice(0,-1);
    }
    return str;
}
async function addDateTime(str){
    const now = await new Date();
    const date =    await now.toLocaleDateString().replace(/\//g, ':');
    const hours =   await String(now.getHours()).padStart(2, '0');
    const minutes = await String(now.getMinutes()).padStart(2, '0');
    return str + '_' + date + '_' + hours + ':' + minutes ;
}
// console.log(addDateTime('123423403824239'));
// console.log(removeLastChar("devesh"));

// JpegFilePath('1234567890');
module.exports = {
    jpegFilePath,
    renameJpegFile,
    removeLastChar,
    addDateTime,
    moveJpegFile
};