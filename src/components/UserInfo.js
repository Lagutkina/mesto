export class UserInfo {
  constructor({ nameSelector, aboutSelector, photoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._photo = document.querySelector(photoSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }
  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._about.textContent = formData.about;
  }
  setProfileImage(link) {
    this._photo.src = link;
  }
}