const { Builder, By, until } = require('selenium-webdriver');
const Pinterest = require('./Pinterest');
const getCredentials = require("../Credentials");

class LoginPageP {
    constructor(browser) {
        this.browser = browser;
        this.username = null;
        this.password = null;
        this.email = null;
    }
    

    async login() {
        const credentials = await new getCredentials();
        const user = await credentials.pintrestCredentials();
        this.email    = await user.email_id;
        this.username = await user.username;
        this.password = await user.password;
        await console.log('\tLoging in to the email : ' + this.email); 

        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div/div[1]/div/div[2]/div[2]/button'))).click();
        await this.browser.wait(until.elementLocated(By.id('email'))).sendKeys(this.email);
        await this.browser.wait(until.elementLocated(By.id('password'))).sendKeys(this.password);
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div[2]/div/div/div/div/div/div[4]/form/div[7]/button'))).click();
        await this.checkForErrors();
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[2]/div/div/div/div[6]/div[5]/div/div/button/div/div')));
        await console.log(`\tlogged in , waiting 2 seconds :`)
        await this.browser.sleep(2000); // sleep for 5 seconds
        return this.goToApp();
    }
    
    async checkForErrors() {
        const errors = await this.browser.findElements(By.css('#error_message'));
        if (errors.length > 0) {
            throw new Error('Errors found on the page');
        }
    }
    async goToApp(){
        return new Pinterest(this.browser , this.username);
    }
}

module.exports = LoginPageP;