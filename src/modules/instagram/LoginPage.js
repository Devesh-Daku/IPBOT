const { Builder, By, until } = require('selenium-webdriver');
const Instagram = require('./Instagram');
const getCredentials = require("../Credentials");

class LoginPageI {
    constructor(browser) {
        this.browser = browser;
        this.username = null;
        this.password = null;
    }
    

    async login() {
        console.log('\tLooking For cookies prompt ');
        try {
            let acceptCookiesButton = await driver.wait(
              until.elementLocated(By.xpath("//button[text()='Accept All']")), 10000);
            await acceptCookiesButton.click();
        } catch (e) {
            console.log('\tCookie consent prompt not found.');
        }
      
        const credentials = await new getCredentials();
        const user = await credentials.instaCredentials();
        this.username = await user.username;
        this.password = await user.password;

        // this.name = await username;
        await console.log('\tLoging in to the username ' + this.username); 
        await this.browser.wait(until.elementLocated(By.name("username"))).sendKeys(this.username);
        await this.browser.wait(until.elementLocated(By.name("password"))).sendKeys(this.password);
        const instaLoginBtn = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[3]/button'))).click();
        await console.log('\tLogged In waiting 5 sec.. to begin');
        await this.browser.sleep(5000); // sleep for 5 seconds

        await this.checkForErrors();
        return this.goToApp();
    }
    
    async checkForErrors() {
        const errors = await this.browser.findElements(By.css('#error_message'));
        if (errors.length > 0) {
            throw new Error('Errors found on the page');
        }
    }
    async goToApp(){
        return new  Instagram(this.browser , this.username);
    }
}

module.exports = LoginPageI;