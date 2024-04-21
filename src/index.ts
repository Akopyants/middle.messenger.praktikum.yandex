import router from './router';

import { LoginPage, SignUp, ChatPage, Profile, ChangePassword, ChangeSettings } from './pages';
import AuthController from './controllers/authControllers';
// import store from './utils/store';
// interface PageMap {
//   [key: string]: ChatPage | LoginPage | SignIn | ChangeSettings | ChangePassword | Profile | NotFound | ErrorPage;
// }

window.addEventListener('DOMContentLoaded', async () => {
  await AuthController.getUser();

  router.use('/', LoginPage);
  router.use('/login', LoginPage);
  router.use('/sign-up', SignUp);
  router.use('/chat', ChatPage);
  router.use('/profile', Profile);
  router.use('/change-password', ChangePassword);
  router.use('/change-settings', ChangeSettings);
  router.start();
});
