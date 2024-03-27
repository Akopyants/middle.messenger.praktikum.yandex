import RenderDOM from './utils/RenderDOM';
import { ChatPage, LoginPage, SignIn, ChangeSettings, ChangePassword, Profile, NotFound, ErrorPage } from './pages';

interface PageMap {
  [key: string]: ChatPage | LoginPage | SignIn | ChangeSettings | ChangePassword | Profile | NotFound | ErrorPage;
}

const pages : PageMap = {
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
  } else {
    console.error('Page not found:', page);
  }
}
navigate('login');

// function handleHashChange() {
//   const page = window.location.hash ? window.location.hash.replace(/^#/, '') : 'sign-in';
//   navigate(page);
// }

// document.addEventListener('DOMContentLoaded', () => handleHashChange());
