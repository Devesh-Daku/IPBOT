
const { Builder, By, until } = require('selenium-webdriver');
const urlPin1 = 'https://www.pinterest.co.uk/';


class Pinterest{
    constructor(browser , username){
        this.browser = browser;
        this.username = username;
    }
    async Logout(){
        try{
        await console.log('\tLogout script Begins....(pinterest)');
        const menubtn = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[2]/div/div/div/div[6]/div[5]/div/div/button')));
        await console.log('\tClicking Menu btn');
        await menubtn.click();
        await this.browser.wait(until.elementLocated(By.xpath('//*[@id="HeaderAccountOptionsFlyout-item-11"]'))).click();
        await console.log('\tLoged out of pintrest ,refreshing tab after 2 sec.');
        await this.browser.sleep(2000);
        await this.browser.navigate().refresh();
        }catch(err){
            console.log("error while loging out of pinterest .. :" ,err);
        }
    }
    async goingToPage(page){
        await console.log(`\tReaching page ${urlPin1 + page}`);
        await this.browser.get(urlPin1 + page);
        await console.log(`\tPage Reached ${urlPin1 + page}`);
    }
    async goingToPinOnBoard( boardPage , pinNum=1){
        await this.goingToPage(boardPage);
        const post = await this.browser.wait(until.elementLocated(By.xpath(`/html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[4]/div[2]/div/div[1]/div/div/div/div/div[1]/div[${pinNum}]`))).click();
    }
    async pinDropDownMenu(){
        await this.browser.navigate().refresh()
        const dropDownMenu = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div[2]/div/div/div/div/div/div/div/div/div/button')));
        await console.log('\tClicking dop-down-menu of pin')
        await dropDownMenu.click();
    }
    async pinDownload(){
        const currentURL = await this.browser.getCurrentUrl();
        await console.log(`\tdownloading the pin with url ${currentURL}`);
        await this.pinDropDownMenu()
        const downloadbtn = await this.browser.wait(until.elementLocated(By.id('pin-action-dropdown-item-1')));
        await console.log('\tClicking download Button of pin')
        await downloadbtn.click();
        await this.witingTillDownloadComplete();
    }
    async witingTillDownloadComplete(){
        //todo
        await console.log('\tdownload completed');
    }
    

}

module.exports = Pinterest;
// /html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[1]
// /html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[2]
// /html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[4]/div[2]/div/div[1]/div/div/div/div/div[1]/div[1]
// /html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[4]/div[2]/div/div[1]/div/div/div/div/div[1]/div[1]/div/div/div/div/div/div/div/div/div/div/div[1]/a
// /html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[4]/div[2]/div/div[1]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div/div/div/div/div/div[1]/a