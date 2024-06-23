const { Builder, By, until } = require('selenium-webdriver');
const urlInsta = 'https://www.instagram.com/';
const CreatePost = require('./CreatePost');


class Instagram {
    constructor(browser,username) {
        this.browser = browser;
        this.username = username;
    }
    async WaitBeforePageLoad(t=0 , pageName){
        if(t) await console.log(`waiting ${t} seconds before reaching ${pageName}...`);
        else await console.log(`${pageName}-loaded`);
        await this.browser.sleep(t*1000);
    }
    async Logout(t) {
        await console.log(`\tLogout Script Begins...(instagram)`);
        await this.ProfileP(t)
        await console.log(`\twaiting 1 seconds before logout runs`);
        await this.browser.sleep(1*1000)
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[3]/span/div/a'))).click();
        await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/div/div/div/div/div/div[1]/div/div[6]'))).click();
        await this.browser.sleep(2000)
        await this.browser.navigate().refresh();
        await console.log('\tloging out from instagram completed');
    }
    async checkForErrors() {
        const errors = await this.browser.findElements(By.css('#error_message'));
        if (errors.length > 0) {
            throw new Error('Errors found on the page');
        }
    }
    async ProfileP(t=5){
        await this.WaitBeforePageLoad(t,"ProfilePage")
        await this.browser.get(urlInsta + this.username + '/?next=%2F');
    }
    async HomePBtn(t=0){
        await this.WaitBeforePageLoad(t,"HomePage");
        await this.browser.get(urlInsta + '?next=%2F');
    }
    async ExplorePBtn(t=0){
       await this.WaitBeforePageLoad(t,"ExplorePage");
       await this.browser.get(urlInsta + 'explore/?next=%2F')
    }
    async MessegesBtn(t=0){
        await this.WaitBeforePageLoad(t,"Messeges");
        await this.browser.get(urlInsta + '/direct/inbox/?next=%2F');
    }
    async CreatePostBtn(){
        const createPostBtn = await this.browser.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[1]/div/div/div/div/div[2]/div[7]/div/span/div/a')));
        await console.log('\tClicking createbtn...');
        await createPostBtn.click();

        await console.log('\tCreatePostInstanceCreated');
        return await new CreatePost(this.browser);
    }

}

module.exports = Instagram;

// xpath of span created later 
// /html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[2]/div/div[1]/div/p/span

// avilable div having role = "textbox"
// /html/body/div[6]/div[1]/div/div[3]/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[2]/div/div[1]/div