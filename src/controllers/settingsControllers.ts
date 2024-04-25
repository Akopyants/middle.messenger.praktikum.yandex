import { profileApi } from '../api/profileDataApi';
import store from '../utils/store';


export class settingsControllers {
  static async changeSettings(data: FormData) {
    try {
      const response = await profileApi.changeSettings(data);
      const user = response.response;

      store.set('user', JSON.parse(user))

      alert('Данные сохранены')
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  static async changePassword(data: FormData) {
    try {
      await profileApi.changePassword(data);

      alert('Пароль успешно изменено')
  
    } catch (err) {
      alert(err)
    }
  }

  static async changeAvatar(data: FormData) {
    try {
      const response = await profileApi.changeAvatar(data);
      const responseText = JSON.parse(response.responseText);

      store.set('user.avatar', responseText.avatar)
    } catch (err) {
      alert(err)
    }
  }
}
