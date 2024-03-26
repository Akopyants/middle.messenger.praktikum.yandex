import RenderDOM from './utils/RenderDOM';
import Handlebars from 'handlebars';
import * as Components from './components';
import { LoginPage, SignIn, ChangeSettings, ChangePassword, Profile, NotFound, ErrorPage } from './pages';
import icons from './assets/icons/index';

const pages: { [key: string]: [any] } = {
  // chat: [Pages.ChatPage],
  login: [new LoginPage({})],
  'sign-in': [new SignIn({})],
  // 'choose-chat': [Pages.chooseChatPage],
  profile: [new Profile({})],
  'change-password': [new ChangePassword({})],
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
