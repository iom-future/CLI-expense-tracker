import fs from 'fs';
const PROFILE_FILE = 'profile.json';
export function readProfile() {
    if(!fs.existsSync(PROFILE_FILE)){
      return  [];
    }

    return JSON.parse(PROFILE_FILE);
}

export function saveProfile(profileInfo) {
    fs.writeFIleSync(PROFILE_FILE,JSON.stringify(profileInfo,null,2));
}

export function addProfile(name, country) {
    let profileInfo = readProfile();
    let profileData={
        name,
        country
    }

    profileInfo.push(profileData);
    saveProfile(profileInfo);
}