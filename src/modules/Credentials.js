const fs = require('fs').promises;
const path = require('path');
const location  = path.join('' ,'credDir/credentials.json');

class getCredentials {
    constructor(){
    }
    
    async instaCredentials(){
        try{
            const data = await fs.readFile(location, 'utf-8');

            const users = JSON.parse(data).instagram;
            // console.log(data);
            const user = users.user4;
           
            return {
                username : user.username,
                password : user.password
            }         
        }catch(err){
            console.log('Error parsing Credentials : ',err);
        }
    }
    async pintrestCredentials(){
        try{
            const data = await fs.readFile(location, 'utf-8');

            const users = JSON.parse(data).pinterest;
            // console.log(data);
            const user = users.user1;
           
            return {
                email_id : user.email_id,
                username : user.username,
                password : user.password
            }         
        }catch(err){
            console.log('Error parsing Credentials : ',err);
        }
    }
}


module.exports = getCredentials;