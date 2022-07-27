export class UserInfo {
  constructor( data ) {
    this._profileName = document.querySelector(data.username);
    this._profileData = document.querySelector(data.status);
  }

  getUserInfo() {
    this._userInformation = {
      username: this._profileName.textContent, 
      status: this._profileData.textContent };
    return this._userInformation    
  }

  setUserInfo(element) {
    this._inputName = element.username;
    this._inputData = element.status;
    this._profileName.textContent = this._inputName;
    this._profileData.textContent = this._inputData;
  };
}
