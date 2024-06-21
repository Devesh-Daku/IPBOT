const { Builder, By, until } = require('selenium-webdriver');
const LoginPageI = require('./instagram/LoginPage');
const LoginPageP = require('./pinterest/LoginPage');
const urlPin1 = 'https://www.pinterest.co.uk/';
const urlPin2 = 'https://in.pinterest.com/';
const urlInsta = 'https://www.instagram.com/';


class HomePage {
    constructor(browser,url) {
        this.browser = browser;
        this.url = url;
        if (this.url === urlPin1 || this.url == urlPin2 ){
            console.log('Pinterest');
            browser.get(url);
            return this.goToLoginPage("pinterest");
        }
        else if(this.url == urlInsta ){
            console.log('Instagram')
            browser.get(url);
            return this.goToLoginPage("instagram");
        }
        else {
            console.log("app not defined yet");
            browser.get(url);
        }
    }

    async goToLoginPage(appName) {
        if(appName === "instagram"){
            return new  LoginPageI(this.browser);
        }
        else if(appName === "pinterest"){
            return new  LoginPageP(this.browser);
        }
    }
}

module.exports = HomePage;