import fs from "fs";

const PROFILE_FILE = 'profile.json';

export function readProfile() {
    if(!fs.existsSync(PROFILE_FILE)){
      return false;
    }
    //TODO:why must we read the file before using it even after storing it in a variable
    const data = fs.readFileSync(PROFILE_FILE);
    return JSON.parse(data);
}

export function saveProfile(profileInfo) {
    fs.writeFileSync(PROFILE_FILE,JSON.stringify(profileInfo,null,2));
}

export function addProfile(name = 'user', country = 'none') {
    let profileInfo = readProfile();
    let profileData={
        name,
        country,
        dateUserJoined :  new Date().toDateString()
    }

    profileInfo.push(profileData);
    saveProfile(profileInfo);
}
//console.log(fs);