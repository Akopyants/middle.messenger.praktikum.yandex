import RenderDOM from './utils/RenderDOM';
import { ChatPage, LoginPage, SignIn, ChangeSettings, ChangePassword, Profile, NotFound, ErrorPage } from './pages';

interface PageMap {
  [key: string]: ChatPage | LoginPage | SignIn | ChangeSettings | ChangePassword | Profile | NotFound | ErrorPage;
}

const pages: PageMap = {
  chat: new ChatPage(),
  login: new LoginPage(),
  'sign-in': new SignIn(),
  profile: new Profile(),
  'change-password': new ChangePassword(),
  'change-settings': new ChangeSettings(),
  'not-found': new NotFound(),
  'error-page': new ErrorPage(),
};

function navigate(page: string): void {
  const source = pages[page];

  if (source) {
    RenderDOM('#app', source);
    window.location.hash = page;
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

function handleHashChange() {
  const page = window.location.hash ? window.location.hash.replace(/^#/, '') : 'login';
  navigate(page);
}

document.addEventListener('DOMContentLoaded', () => handleHashChange());
