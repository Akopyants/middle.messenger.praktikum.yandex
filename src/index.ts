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
// import LoginPage from './pages/login-page';


const pages: { [key: string]: [any] } = {
  chat: [Pages.ChatPage],
  login: [new LoginPage({})],
  'sign-in': [new SignIn({})],
  'choose-chat': [Pages.chooseChatPage],
  profile: [new Profile({})],
  'change-password': [new changePassword({})],
  'change-settings': [new ChangeSettings({})],
  'not-found': [Pages.NotFound],
  'error-page': [Pages.ErrorPage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string): void {
  const [source] = pages[page];
  
  RenderDOM('#app', source)

  window.location.hash = page;
}

function handleHashChange() {
  const page = window.location.hash ? window.location.hash.replace(/^#/, '') : 'profile';
  navigate(page);
}

document.addEventListener('DOMContentLoaded', () => handleHashChange());

// document.addEventListener('click', (e) => {
//   // const target = e.target as HTMLElement;
//   // const page = target.getAttribute('page');
//   // if (page) {
//   //   navigate(page);

//   //   e.preventDefault();
//   //   e.stopImmediatePropagation();
//   // }
// });

Handlebars.registerHelper('icons', function (iconName) {
  return new Handlebars.SafeString(icons[iconName]);
});
