export class UserInfo {
  constructor( userNameSelector, statusSelector, avatarSelector ) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileData = document.querySelector(statusSelector);
    this._profileAvatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    this._userInformation = {
      name: this._profileName.textContent, 
      about: this._profileData.textContent };
    return this._userInformation    
  }

  setUserInfo(element) {
    this._name = element.name;
    this._about = element.about;
    this._profileName.textContent = this._name;
    this._profileData.textContent = this._about;
  }

  setAvatarInfo(data) {
    this._avatar = data.avatar;
    this._profileAvatar.src = this._avatar;
  }
}
