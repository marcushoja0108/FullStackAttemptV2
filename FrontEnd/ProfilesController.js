
async function updateProfile(profileId){
    let profile =model.data.profiles.find(profile => profile.id == profileId)
    let updatedProfile = {
        name: model.input.edit.name || profile.name,
        age: parseInt(model.input.edit.age) || profile.age,
        country: model.input.edit.country || profile.country
    };

    await axios.put(`http://localhost:5196/profiles/${profileId}`,updatedProfile);
    model.input.editProfile = '';
    updateView();
}

async function GetProfiles(){
    const response = await axios.get('http://localhost:5196/profiles')
    model.data.profiles = response.data;
    updateView();
}

async function AddProfile(){
    let newProfile = {
        name: model.input.submit.name,
        age: model.input.submit.age,
        country: model.input.submit.country
    };
    if(newProfile.age <1 || !newProfile.name || !newProfile.country){
        alert("Invalid inputs")
        return
    }
    await axios.post('http://localhost:5196/profiles', newProfile);
    GetProfiles();
}

async function DeleteProfile(id){
    await axios.delete(`http://localhost:5196/profiles/${id}`);
    GetProfiles();
}