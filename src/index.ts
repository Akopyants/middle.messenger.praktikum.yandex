import RenderDOM from './utils/RenderDOM';
import { ChatPage, LoginPage, SignIn, ChangeSettings, ChangePassword, Profile, NotFound, ErrorPage } from './pages';

const pages: { [key: string]: [any] } = {
  chat: [new ChatPage({})],
  login: [new LoginPage({})],
  'sign-in': [new SignIn({})],
  profile: [new Profile({})],
  'change-password': [new ChangePassword({})],
  'change-settings': [new ChangeSettings({})],
  'not-found': [new NotFound({})],
  'error-page': [new ErrorPage({})],
};

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
