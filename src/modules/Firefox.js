const firefox = require('selenium-webdriver/firefox');
const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');
const downloadPath = path.resolve('src/Assets/Downloads/')
class Fire_fox{
    constructor(){
    }
    async createBrowser(){
        const options = new firefox.Options();
        options.setPreference("browser.download.folderList",2)
        options.setPreference("browser.download.manager.showWhenStarting",false);
        options.setPreference("browser.download.dir",downloadPath);
        options.setPreference("browser.helperApps.neverAsk.saveToDisk", "application/pdf");
        let driver = await new Builder()
                .forBrowser('firefox')
                .setFirefoxOptions(options)
                .build();

        
        return driver;
    }
}


module.exports = Fire_fox;