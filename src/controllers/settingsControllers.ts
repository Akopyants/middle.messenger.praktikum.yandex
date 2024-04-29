import { profileApi } from '../api/profileDataApi';
import store from '../utils/store';


export class SettingsControllers {
  static async changeSettings(data: FormData) {
    try {
      const response = await profileApi.changeSettings(data);
      const user = response.response;
      
      try {
        store.set('user', JSON.parse(user))
      } catch (error) {
        console.log(error)
      }

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
      try {
        const responseText = JSON.parse(response.responseText);
        store.set('user.avatar', responseText.avatar)
      } catch (error) {
        console.log(error)
      }
    } catch (err) {
      alert(err)
    }
  }
}
