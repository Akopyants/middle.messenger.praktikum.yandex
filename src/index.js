import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { ifEq } from '@scripts/helpers';
import { icons } from '@/assets/icons/index';

console.log(icons.arrowRight);

const pages = {
  chat: [Pages.ChatPage],
  login: [Pages.LoginPage],
  'sign-in': [Pages.SignIn],
  'choose-chat': [Pages.chooseChatPage],
  profile: [Pages.Profile],
  'change-password': [Pages.ChangePassword],
  'change-settings': [Pages.ChangeSettings],
  'not-found': [Pages.NotFound],
  'error-page': [Pages.ErrorPage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
  const [source, args] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
  window.location.hash = page;
}

function handleHashChange() {
  const page = window.location.hash ? window.location.hash.replace(/^#/, '') : 'login';
  navigate(page);
}

document.addEventListener('DOMContentLoaded', () => handleHashChange());

document.addEventListener('click', (e) => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper('if_eq', ifEq);
Handlebars.registerHelper('icons', function (iconName) {
  return new Handlebars.SafeString(icons[iconName]);
});
