import { authApi } from '../api/autApi';
import router from '../router';
import store from '../utils/store';
// import store from '../utils/store';

class AuthController {
  public logout(): Promise<void> {
    return authApi.logout().then(() => {
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.go('/login');
    });
  }
  public async login(data: FormData) {
    try {
      await authApi.login(data);
      router.go('/chat');
      const res = await authApi.getUserData();
      store.set('user', JSON.parse(res.response));
      console.log(store);
    } catch (error) {
      if (error instanceof XMLHttpRequest) {
        alert(error.response);
      }
    }
  }

  public async registration(data: FormData) {
    try {
      const res = await authApi.registration(data);
      store.set('user', JSON.parse(res.response));
    } catch (error) {
      if (error instanceof XMLHttpRequest) {
        alert(error.response);
      }
    }
  }


  public async getUser(): Promise<void> {
    try {
      const res = await authApi.getUserData();

      if (res.status === 200) {
        router.go('/chat')
        store.set('user', JSON.parse(res.response));
      }

    } catch (error) {
      store.set('user', {});
      router.go('/')

    }
  }
}

export default new AuthController();
