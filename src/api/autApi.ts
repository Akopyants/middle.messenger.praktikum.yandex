import apiUrl from './apiUrl';
import BaseAPI from '../utils/BaseApi';
import HTTPTransport from '../utils/HTTPTransport';

const fetch = new HTTPTransport(`${apiUrl}/auth`);

class AuthApi extends BaseAPI {
  getUserData() {
    return fetch.get('user');
  }

  logout() {
    return fetch.post('logout');
  }

  login(formData: FormData) {
    const data = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };

    return fetch.post('signin', { data });
  }

  registration(formData: FormData) {
    const data = {
      first_name: formData.get('first_name') as string,
      second_name: formData.get('second_name') as string,
      login: formData.get('login') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
    };
    return fetch.post('signup', { data });
  }
}

export const authApi = new AuthApi();
