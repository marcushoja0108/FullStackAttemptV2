function GridControllers(){
    let html = /*HTML*/`
    <div class="form-container">
    <label>Name: </label><input onchange= "model.input.submit.name = this.value">
    <label>Age: </label><input type="number" min="1" onchange= "model.input.submit.age = this.value">
    <label>Country: </label><input onchange= "model.input.submit.country = this.value">
    <button onclick=AddProfile()>Submit</button>
    </div>
    `;
    return html
}

function ShowProfilesGrid(){
    let html = "";
    if(model.data.profiles.length > 0){
        for(i = 0; i < model.data.profiles.length; i++){
            let profile = model.data.profiles[i]
            if(model.input.editProfile != profile.id){
                html += showProfile(profile)
            }
            else{
                html += showEditProfile(profile)
            }
        }
    }
    else{
        html = /*HTML*/ `
        <div class="no-profiles">Ingen tilgjengelige profiler</div>
        `;
    }
    return html
}

function showEditProfile(profile){
    let html = /*HTML*/`
    <div class="profile-element">
            <input onchange="model.input.edit.name = this.value" value=${profile.name}>
            <input type="number" onchange="model.input.edit.age = this.value" value=${profile.age}>
            <input onchange="model.input.edit.country = this.value" value=${profile.country}>
            <div class="profile-buttons"><button class="delete-button" onclick=DeleteProfile(${profile.id})>Delete profile</button>
                <button class="saveChanges-button" onclick="updateProfile(${profile.id})">Save changes</button></div>
        </div>
    `;
    return html
}

function showProfile(profile){
    let html = /*HTML*/`
    <div class="profile-element">
            <div class="profile-name">${profile.name}</div>
            <div class="profile-age">${profile.age}</div>
            <div class="profile-country">${profile.country}</div>
            <div class="profile-buttons"><button class="delete-button" onclick=DeleteProfile(${profile.id})>Delete profile</button>
                <button class="edit-button" onclick="updateMode(${profile.id})">Edit profile</button></div>
        </div>
    `;
    return html;
}

function updateMode(profileId){
    model.input.editProfile = profileId
    updateView()
}