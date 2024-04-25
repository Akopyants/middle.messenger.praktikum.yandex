import apiUrl from './apiUrl';
import BaseAPI from '../utils/BaseApi';
import HTTPTransport from '../utils/HTTPTransport';

const fetch = new HTTPTransport(`${apiUrl}/user`);

class profileDataApi extends BaseAPI {
  changeSettings(formData: FormData) {
    const data = {
      first_name: formData.get('first_name') as string,
      second_name: formData.get('second_name') as string,
      display_name: formData.get('display_name') as string,
      login: formData.get('login') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    return fetch.put('profile', { data });
  }

  changeAvatar(formData : FormData) {
    return fetch.put('profile/avatar', {
      data : { file: formData }
    })
  }

  changePassword(formData: FormData) {
    const data = {
      oldPassword: formData.get('oldPassword') as string,
      newPassword: formData.get('newPassword') as string,
    };

    return fetch.put('password', { data });
  }
}

export const profileApi = new profileDataApi();
