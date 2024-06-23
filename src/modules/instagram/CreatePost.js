const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

class CreatePost{
    constructor(browser){
        this.browser = browser;
    }
    async uploadFile(jpegPath){
        let fileInput = await this.browser.wait(until.elementLocated(By.css('input[type="file"]')));
        await console.log('\tInputing file ...')
        await fileInput.sendKeys(jpegPath);
        await console.log('\tSleeping 2 sec...');
        await this.browser.sleep(2000);
        await this.nextBtn();
    }
    async addFilter(n=1,x=100){
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[1]'))).click();
        await console.log(`\tAdding Filter number ${n} with strength ${x}/100 :`);
        await this.browser.wait(until.elementLocated(By.xpath(`/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[${n}]/button`))).click();
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[3]/div/div/div[1]/input'))).sendKeys(x);
        await console.log('\tFilter Sucessfully added :');
    }
    async addAdjustment(bri = 0 ,cont =0 ,fade =0,satu =0,temp =0,vign=0){
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[2]'))).click();
        await this.browser.sleep(1000);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[1]/input'))).sendKeys(brig);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div/div[2]/div/div[1]/input'))).sendKeys(cont);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[3]/div/div[2]/div/div[1]/input'))).sendKeys(fade);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[4]/div/div[2]/div/div[1]/input'))).sendKeys(satu);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[5]/div/div[2]/div/div[1]/input'))).sendKeys(temp);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[6]/div/div[2]/div/div[1]/input'))).sendKeys(vign);

        await this.nextBtn();
    }
    async nextBtn(){
        const next1btn = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[1]/div/div/div/div[3]/div/div')));
        await console.log('\twaiting .5 sec after founding nextBtn');
        await this.browser.sleep(500);
        await console.log('\tNextbtnclick...')
        await next1btn.click();
    }
    async addingACaption(caption = "Default Caption"){
        await console.log('\tInputing Captions ');
        const textbox = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[2]/div/div[1]/div[1]'))).sendKeys(' ');

        for (let i = 0; i < caption.length; i++) {
            var textinput = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[2]/div/div[1]/div')));
            await this.browser.sleep(50);
            await textinput.sendKeys(caption[i]);
        }
        await this.browser.sleep(100);
                
    }
    async noFilter_noAdjustment(){
        await this.nextBtn();
    }
    async shareBtn(){
        const sharebtn = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[1]/div/div/div/div[3]/div/div')));
        await console.log('\tClicking Sharebtn');
        await sharebtn.click();
        // await sharebtn.click();

        const confirmImag = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[1]/div/div[2]/div/span')));
        await console.log("\tUpload complete");
    }
}

module.exports = CreatePost;