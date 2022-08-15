export class UserInfo {
  constructor( data ) {
    this._profileName = document.querySelector(data.name);
    this._profileData = document.querySelector(data.about);
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
  };
}
