import router from './router';

import { LoginPage, SignUp, ChatPage, Profile, ChangePassword, ChangeSettings } from './pages';
import AuthController from './controllers/authControllers';

window.addEventListener('DOMContentLoaded', async () => {
  await AuthController.getUser();

  router.use('/', LoginPage);
  router.use('/login', LoginPage);
  router.use('/sign-up', SignUp);
  router.use('/messenger', ChatPage);
  router.use('/profile', Profile);
  router.use('/change-password', ChangePassword);
  router.use('/settings', ChangeSettings);
  router.start();
});
