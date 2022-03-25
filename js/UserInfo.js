export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }
  getUserInfo() {
    const userInfo = {
      'user-name': this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }
  setUserInfo(formData) {
    console.log(this);
    this._name.textContent = formData['user-name'];
    this._about.textContent = formData.about;
  }
}