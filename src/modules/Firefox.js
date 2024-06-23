const firefox = require('selenium-webdriver/firefox');
const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');
const proxy = require('selenium-webdriver/proxy');
const downloadPath = path.resolve('src/Assets/Downloads/')
const userAgents = require('user-agents');


// //Using Online Browser on LambdaTest
// const capabilities = require('../../capability');
// const USERNAME = capabilities.capability["LT:Options"].username;
// const KEY = capabilities.capability["LT:Options"].accessKey;
// const GRID_HOST = 'hub.lambdatest.com/wd/hub';
// const grid_URL = 'https://'+USERNAME+':'+KEY+'@'+GRID_HOST;


class Fire_fox{
    constructor(){
    }
    async createBrowser(){
        // setting up downlad directory 
        const options = new firefox.Options();
        // const userAgent = new userAgents().toString();
        // const proxyList = ['proxy1:port', 'proxy2:port'];
        // const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
        // options.setProxy(proxy.manual({ http: randomProxy, https: randomProxy }));
        // options.addArguments(`--user-agent=${userAgent}`);
        // options.addArguments('--disable-blink-features=AutomationControlled');
        options.setPreference("browser.download.folderList",2);
        options.setPreference("browser.download.manager.showWhenStarting",false);
        options.setPreference("browser.download.dir",downloadPath);
        options.setPreference("browser.helperApps.neverAsk.saveToDisk", "application/pdf");


        let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build()

        
        await console.log('\tFirefox Browser Build')
        return driver;
    }
}


module.exports = Fire_fox;