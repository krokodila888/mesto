export class UserInfo {
  constructor( data ) {
    this._inputName = data.userName;
    this._inputData = data.userText;
    this._nameText = document.querySelector('.profile__username');
    this._statusText = document.querySelector('.profile__status');
  }

  getUserInfo () {
    const userInformation = {
      userName: this._nameText.textContent, 
      userText: this._statusText.textContent };
    return userInformation    
  }

  setUserInfo( element ) {
    this._inputName = element.userName;
    this._inputData = element.userText;
    this._nameText.textContent = this._inputName;
    this._statusText.textContent = this._inputData;
  };
}
