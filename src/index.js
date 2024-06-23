const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require('./modules/HomePage')
const urlPin1 = 'https://www.pinterest.co.uk/';
const urlPin2 = 'https://in.pinterest.com/';
const urlInsta = 'https://www.instagram.com/';
const ideaPage = "deveshdaku/ideas/";
const getCredentials = require('./modules/Credentials')
const Fire_fox = require('./modules/Firefox');
const { jpegFilePath , renameJpegFile , removeLastChar , addDateTime , moveJpegFile} = require('./modules/JpegFileHandler');
const {captionGenerator} = require('./modules/Gemini/ImageCaptionGenerator');




async function main(){
    const fire_fox = await new Fire_fox();
    const browser = await fire_fox.createBrowser();
    let pinUrl = null;
    let caption = null;
    try{
        const pinterestLoginPage = await new HomePage(browser ,urlPin1);
        const pinterest = await pinterestLoginPage.login();
        try{
            await pinterest.goingToPinOnBoard(ideaPage,1);
            pinUrl = await pinterest.pinDownload();
        }catch(err){
            console.log("error in printrest part " , err);
        }finally{
            
            let namefile = await  (removeLastChar( await pinUrl.substring((urlPin1+'pin/').length)));
            await console.log('\tName will be given to file is  :' + namefile);
            await pinterest.Logout();
            await browser.sleep(5000);
            
            const jpegFileP = await jpegFilePath(namefile);
            
            // caption generation 
            const DEfcaption = `Captured from Pinterest Pin. For those interested in exploring the full context and giving proper credit, please visit the original post at [ ${pinUrl} ]. #PinterestInspiration #RespectfulSharing #NoCopyrightClaim`
            caption = await captionGenerator(jpegFileP);
            if(!caption){
                caption = DEfcaption;
            }
            
            caption = caption + '\n'+ DEfcaption ;
            await console.log('\nThe Caption is : \n' + caption);
            
            if(jpegFileP){
                const instagramLoginPage = await new HomePage(browser , urlInsta);
                const instagram = await instagramLoginPage.login()
                try{
                        const post = await instagram.CreatePostBtn();
                        await post.uploadFile(jpegFileP);
                        await post.noFilter_noAdjustment();
                        await post.addingACaption(caption);
                        await post.shareBtn();
                        await browser.sleep(2000);
                    }
                    catch(error){
                        console.log("error in instagram part" , error)
                    }finally{
                    await moveJpegFile(jpegFileP);
                    await instagram.Logout(.5);
                }
            }
            else {
                throw err;
            }   
        }
    }catch(err){
        console.log('error occured : ', err);
    }
    finally{
        await console.log('quitting browser automatically in 15 seconds..');
        await browser.sleep(15000);
        // await browser.quit();
    }
}
main();