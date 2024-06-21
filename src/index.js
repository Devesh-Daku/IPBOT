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
            const jpegPath = await JpegFilePath();
            if(jpegPath){
                await pinterest.Logout();
                const instagramLoginPage = await new HomePage(browser , urlInsta);
                const instagram = await instagramLoginPage.login()
                try{
                        await instagram.CreatePostBtn(jpegPath);
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
main();