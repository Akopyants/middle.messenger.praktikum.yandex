import RenderDOM from './utils/RenderDOM';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import icons from './assets/icons/index';
import LoginPage from './pages/login-page';
import SignIn from './pages/sign-in';
import ChangeSettings from './pages/change-settings';
import changePassword from './pages/change-password';
import Profile from './pages/profile';
import NotFound from './pages/not-found';
import ErrorPage from './pages/error-page';

const pages: { [key: string]: [any] } = {
  chat: [Pages.ChatPage],
  login: [new LoginPage({})],
  'sign-in': [new SignIn({})],
  'choose-chat': [Pages.chooseChatPage],
  profile: [new Profile({})],
  'change-password': [new changePassword({})],
  'change-settings': [new ChangeSettings({})],
  'not-found': [new NotFound({})],
  'error-page': [new ErrorPage({})],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string): void {
  const [source] = pages[page];

  RenderDOM('#app', source);

  window.location.hash = page;
}

function handleHashChange() {
  const page = window.location.hash ? window.location.hash.replace(/^#/, '') : 'error-page';
  navigate(page);
}

document.addEventListener('DOMContentLoaded', () => handleHashChange());

Handlebars.registerHelper('icons', function (iconName) {
  return new Handlebars.SafeString(icons[iconName]);
});
