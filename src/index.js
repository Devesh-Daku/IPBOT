const { Builder, By, until } = require('selenium-webdriver');
const HomePage = require('./modules/HomePage')
const urlPin1 = 'https://www.pinterest.co.uk/';
const urlPin2 = 'https://in.pinterest.com/';
const urlInsta = 'https://www.instagram.com/';
const ideaPage = "deveshdaku/ideas/";
const getCredentials = require('./modules/Credentials')
const Fire_fox = require('./modules/Firefox');
const JpegFilePath = require('./modules/JpegFileHandler');
const moveJpeg = require('./modules/MoveJpeg');


async function main() {
  
    const fire_fox = await new Fire_fox();
    const browser = await fire_fox.createBrowser();
    try{
        const pinterestLoginPage = await new HomePage(browser ,urlPin1);
        const pinterest = await pinterestLoginPage.login();
        try{
            await pinterest.goingToPinOnBoard(ideaPage,1);
            await pinterest.pinDownload();
        }catch(err){
            console.log("error in printrest part " , err);
        }finally{
            await pinterest.Logout();
            const jpegPath = await JpegFilePath();
            if(jpegPath){
                const instagramLoginPage = await new HomePage(browser , urlInsta);
                const instagram = await instagramLoginPage.login()
                try{
                        const post = await instagram.CreatePostBtn();
                        await post.uploadFile(jpegPath);
                        await post.noFilter_noAdjustment();
                        await post.addingACaption();
                        await post.shareBtn();
                        await browser.sleep(2000);
                        await moveJpeg(jpegPath);
                }catch(error){
                    console.log("error in instagram part" , error)
                }finally{
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
        await browser.quit();
    }
}
test();

async function test(){
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
            
            await pinterest.Logout();
            const jpegPath = await JpegFilePath();
            if(jpegPath){
                caption = `Captured from Pinterest Pin. For those interested in exploring the full context and giving proper credit, please visit the original post at [ ${pinUrl} ]. #PinterestInspiration #RespectfulSharing #NoCopyrightClaim`
                const instagramLoginPage = await new HomePage(browser , urlInsta);
                const instagram = await instagramLoginPage.login()
                try{
                        const post = await instagram.CreatePostBtn();
                        await post.uploadFile(jpegPath);
                        await post.noFilter_noAdjustment();
                        await post.addingACaption(caption);
                        await post.shareBtn();
                        await browser.sleep(2000);
                    }catch(error){
                        console.log("error in instagram part" , error)
                    }finally{
                    await moveJpeg(jpegPath);
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