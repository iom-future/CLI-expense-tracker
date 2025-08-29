import fs from "fs";

const PROFILE_FILE = 'profile.json';
const jsonToObject = fs.readFileSync(PROFILE_FILE);
let objectLength = Object.keys(JSON.parse(jsonToObject)).length;

export function readProfile() {
    //check if there is a content
    if(objectLength===0){
      return null //'you can use a string like 'no content'
    }
    //TODO:why must we read the file before using it even after storing it in a variable
    const data = fs.readFileSync(PROFILE_FILE);
    return JSON.parse(data);
}

export function saveProfile(profileInfo) {
    fs.writeFileSync(PROFILE_FILE,JSON.stringify(profileInfo,null,2));
}

export function addProfile(name = 'user', country = 'none',password) {

    let profileInfo={
        name,
        country,
        password,
        dateUserJoined :  new Date().toDateString()
    }

    saveProfile(profileInfo);
}
//console.log(fs);

//update profile
export function updateProfile(newUserName = readProfile().name,newCountry =readProfile().country) {
    //load object
    let profileInfo = readProfile();
    //update object with the new input(or leave the same using the default parameter)
     profileInfo.name  = newUserName;
     profileInfo.country = newCountry;

    //save back into the json file ;without adding a new object
    saveProfile((profileInfo));
}

//console.log(readProfile());